#!/usr/bin/env python3
"""Reproduce inventory from preserved official web text when raw HTML is blocked.
Names are explicitly delimited in catalog-names.txt because web text flattens
product title + description. Every name is checked against its source link text.
Re-running preserves delivery statuses and edits for already discovered slugs.
"""
import json,re,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
source=(P/'catalog-source.txt').read_text()
links=(P/'catalog-link-responses.txt').read_text()
urls={}
for match in re.finditer(r'^.*?\((https://[^\s]+)\)\n[^\n]*Source: click\(\{"ref_id":"turn2view0","id":(\d+)\}',links,re.M):
    urls[int(match[2])]=match[1]
# A catalog link that currently returns HTTP 404 still has an observed target.
urls[126]='https://docs.cloud.google.com/telecom-subscriber-insights/docs'
names=[n for line in (P/'catalog-names.txt').read_text().splitlines() for n in line.split('|')]
def slug(s): return re.sub('[^a-z0-9]+','-',s.lower()).strip('-')
overrides={'Google Kubernetes Engine (GKE)':'google-kubernetes-engine','Virtual Private Cloud (VPC)':'virtual-private-cloud','Identity and Access Management (IAM)':'identity-and-access-management','Network Connectivity Center (NCC)':'network-connectivity-center','Anti Money Laundering AI (AML AI)':'anti-money-laundering-ai'}
categories=[]; services=[]; category=None
for line in source.splitlines():
    if not re.match(r'L(?:24[2-9]|2[5-9]\d|3\d\d|4[0-3]\d):',line): continue
    h=re.match(r'L\d+: ## (.+)',line)
    if h:
        category=h[1]; categories.append({'name':category,'slug':slug(category)})
    item=re.search(r'【(\d+)†([^】]+)】',line)
    if not item or not category: continue
    ident=int(item[1])
    if not 16<=ident<=192: continue
    name=names[ident-16]; assert item[2].startswith(name+' '),(name,item[2])
    s=overrides.get(name,slug(name)); cat=slug(category)
    abbreviations=re.findall(r'\(([^)]+)\)',name)
    aliases=[name]+abbreviations
    if name in ['Logging','Monitoring','Profiler','Trace']: aliases.append('Cloud '+name)
    if name=='Cloud Storage': aliases+=['Google Cloud Storage','GCS']
    if name=='Compute Engine': aliases+=['Google Compute Engine','GCE']
    if name=='DocAI': aliases+=['Document AI']
    if name=='Infra Manager': aliases+=['Infrastructure Manager']
    if name=='CA Service': aliases+=['Certificate Authority Service']
    services.append(dict(officialCategory=category,categorySlug=cat,canonicalName=name,displayName=name,slug=s,aliases=aliases,abbreviations=abbreviations,description=item[2][len(name)+1:],iconIdentifier=None,iconStatus='PENDING',documentationUrl=urls.get(ident),sourceLinkId=ident,route=f'/gcp-services?service={s}',el10Filename=f'gcp-{s}.webp',el10Path=f'/gcp/{cat}/gcp-{s}.webp',el10Status='PENDING',walkthroughRequired=None,primaryWalkthroughFilename=f'{s}-primary.webp',primaryWalkthroughPath=f'/gcp-service-walkthroughs/{s}-primary.webp',primaryWalkthroughStatus='PENDING',companionRequired=None,companionWalkthroughFilename=f'{s}-companion.webp',companionWalkthroughPath=f'/gcp-service-walkthroughs/{s}-companion.webp',companionWalkthroughStatus='PENDING',servicePageStatus='PENDING',relatedServices=[],mappingStatus='PENDING',routeStatus='PENDING',qaStatus='PENDING',notes=['Walkthrough selection and companion applicability require service-specific review.']))
for service in services:
    if service['sourceLinkId']==126: service['notes'].append('Official catalog target returned HTTP 404 on 2026-09-26; target retained as observed, needs source repair/recheck.')
assert len(services)==177
assert len({s['slug'] for s in services})==177
path=P/'gcp-services.json'
if path.exists():
    previous={s['slug']:s for s in json.loads(path.read_text())['services']}
    for service in services:
        if service['slug'] in previous:
            service.update({k:v for k,v in previous[service['slug']].items() if k not in ['documentationUrl','description','canonicalName','officialCategory','sourceLinkId']})
result={'schemaVersion':1,'source':{'url':'https://docs.cloud.google.com/docs/product-list','retrievedAt':'2026-09-26','sourceUpdatedAt':'2026-09-04','retrievalMethod':'Web tool main article text and linked product page URLs; raw HTTP returned Site Unavailable','scope':'All 177 linked products in the main article; navigation-only links excluded','sourceSnapshot':'docs/gcp/catalog-source.txt','sourceSha256':hashlib.sha256(source.encode()).hexdigest(),'license':'Creative Commons Attribution 4.0 as stated by source'},'categories':categories,'services':services}
path.write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'services':len(services),'categories':len(categories),'resolvedUrls':sum(bool(s['documentationUrl']) for s in services),'unresolvedLinkIds':[s['sourceLinkId'] for s in services if not s['documentationUrl']]}))
