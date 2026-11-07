"""Render original, text-accurate DVA module 08 architecture study boards."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-visuals/dva-c03/module-08'
OUT.mkdir(parents=True, exist_ok=True)
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

# title, four architecture stations, four explanations, decision takeaway
SLIDES = {
3: ('CloudFront cache or S3 replication?', ['Viewer', 'Edge cache', 'Origin S3', 'Replica Region'], ['CloudFront caches copies at edge locations for the configured TTL.', 'A cache miss travels to the origin; expiry or invalidation changes freshness.', 'S3 replication copies objects to selected destination buckets in other Regions.', 'Choose CDN for global delivery; replication for regional copies and resilience.'], 'A CDN cache is not a cross-Region object replica.'),
6: ('Why did the cache hit ratio fall?', ['Request', 'Cache key', 'Edge variants', 'Origin load'], ['Every forwarded key value can create a distinct cached variant.', 'A changing session cookie or tracking query parameter fragments the cache.', 'Inspect the cache policy, hit ratio, TTL and actual request headers.', 'Keep only values that change the response in the key.'], 'Reduce unnecessary key cardinality before raising TTL.'),
7: ('Cache policy vs origin request policy', ['Viewer values', 'Cache key', 'Origin request', 'Origin response'], ['Cache policy defines which headers, cookies and query strings vary cached objects.', 'Values included in the cache key are also sent to the origin.', 'Origin request policy can forward extra values without varying the cache.', 'Do not cache user-specific responses under a shared key.'], 'Forwarding a value and varying the cache are different decisions.'),
8: ('Fresh content: version or invalidate', ['Deploy v2', 'Versioned URL', 'Edge cache', 'Viewer'], ['A new asset path such as /app.v2.js naturally gets a new cache key.', 'Invalidation removes selected cached paths before their TTL expires.', 'Invalidation is asynchronous; wildcard paths broaden the request.', 'Keep immutable assets at long TTL and change their names on release.'], 'Prefer versioned URLs for routine static releases.'),
9: ('Route sign-in traffic separately', ['Viewer path', 'Ordered behavior', 'Default behavior', 'Origin'], ['CloudFront evaluates ordered path patterns before the default behavior.', 'Route /login/* to a dynamic origin with caching disabled where needed.', 'Keep static assets on a cache-friendly behavior and policy.', 'A behavior also selects allowed methods, origin and viewer controls.'], 'One distribution can serve distinct application paths safely.'),
11: ('Choose a CloudFront origin path', ['Viewer', 'CloudFront', 'VPC origin', 'Private service'], ['VPC origins can reach supported private ALB, NLB or EC2 origins.', 'A traditional public custom origin needs network and origin access controls.', 'OAC secures supported S3 bucket origin requests; it is not a generic ALB control.', 'Verify the origin type, TLS and security group path before choosing.'], 'Private S3 and private application origins use different controls.'),
12: ('Geo restriction is an edge filter', ['Viewer country', 'Allow / block', 'Distribution', 'Origin'], ['CloudFront country restriction checks the viewer location at the edge.', 'An allow list permits specified countries; a block list rejects specified countries.', 'VPNs and proxies can affect location inference.', 'Use application identity and authorization for sensitive access decisions.'], 'Location filtering alone does not identify a user.'),
14: ('Verify a CloudFront signed URL', ['Signer', 'Key group', 'Signed policy', 'Edge check'], ['Generate a signature with the private key; keep that key out of the client.', 'Associate the public key through a trusted key group on the behavior.', 'The edge verifies signature, resource and expiration or custom policy.', 'Signing controls viewer access; OAC controls the separate origin request.'], 'A valid signature must match the policy and trusted public key.'),
15: ('Three ways to grant temporary access', ['CloudFront URL', 'Signed cookie', 'S3 presign', 'Private object'], ['Signed URL grants access to one CloudFront resource or policy scope.', 'Signed cookies suit several restricted files without changing each URL.', 'S3 presigned URL authorizes a direct S3 request with signer permissions.', 'CloudFront viewer signing and S3 origin authorization are separate.'], 'Select the signature boundary that matches the viewer path.'),
17: ('Multiple origins, one distribution', ['Path pattern', 'Behavior', 'Origin A', 'Origin B'], ['An ordered /api/* behavior can select an API or application origin.', 'The default behavior can serve static files from S3.', 'Choose cache and allowed-method settings per behavior.', 'Specific patterns must take precedence over the default fallback.'], 'The behavior decides both origin routing and edge policy.'),
19: ('Protect a sensitive POST field', ['Browser form', 'Edge encryption', 'Origin', 'Decrypt service'], ['Field-level encryption encrypts selected form fields at the CloudFront edge.', 'Configure the field profile and public key for the matching behavior.', 'The authorized application decrypts those fields using its private key.', 'TLS still protects transport; field encryption limits plaintext exposure downstream.'], 'Keep the decryption private key with the authorized application.'),
20: ('Stream CloudFront request logs', ['Edge request', 'Log config', 'Kinesis stream', 'Consumers'], ['Real-time logs deliver selected fields to a Kinesis Data Stream.', 'Choose a sampling rate and fields that answer the diagnostic question.', 'Provision the stream and consumer capacity for expected traffic.', 'Use standard logs when delayed batch delivery is sufficient.'], 'Real-time logging trades latency for stream and processing cost.'),
22: ('Diagnose a stale edge response', ['Viewer request', 'Cache key', 'TTL / invalidation', 'Origin'], ['First identify the exact behavior and cache policy used by the request.', 'Check whether headers, cookies or query strings select another variant.', 'Check TTL, origin cache headers, invalidation status and versioned path.', 'Compare the edge response with an origin request before changing policy.'], 'Find the selected cache variant before invalidating everything.'),
23: ('Keep API traffic dynamic', ['Browser', 'CloudFront /api/*', 'API Gateway', 'Integration'], ['Select a specific behavior for dynamic API paths.', 'Forward the headers and query values the API actually needs.', 'Disable caching for per-user responses unless the cache key isolates users.', 'Configure CORS and authorization at the appropriate API boundary.'], 'A CDN in front of an API does not make personalized data cache-safe.'),
24: ('Edge delivery and origin recovery', ['Global viewers', 'Edge cache', 'Origin group', 'Backup origin'], ['Price class controls the edge footprint and delivery cost.', 'Cache hits reduce origin requests; misses still depend on origin health.', 'An origin group can fail over on configured eligible status codes.', 'Plan data consistency and recovery behavior at the backup origin.'], 'Edge availability and origin failover solve different failure modes.'),
30: ('Stage variable to Lambda alias', ['REST stage', 'Stage variable', 'Alias ARN', 'Lambda version'], ['A REST stage variable can select a Lambda alias in an integration URI.', 'Publish immutable function versions and point an alias to the chosen version.', 'Grant API Gateway permission to invoke the relevant alias ARN.', 'Deploy the REST API changes to the stage and test the resolved target.'], 'An alias switch and a stage deployment are separate release actions.'),
31: ('Canary a REST API deployment', ['Stage traffic', 'Baseline', 'Canary %', 'Metrics'], ['Assign a small percentage of stage requests to a canary deployment.', 'Optionally override stage variables for the canary path.', 'Compare latency, 4xx and 5xx metrics before increasing traffic.', 'Promote or remove the canary after validation; verify rollback behavior.'], 'Measure the canary before shifting the whole stage.'),
34: ('Transform a non-proxy request', ['Client JSON', 'VTL template', 'Integration', 'Backend payload'], ['A REST API mapping template transforms request body or parameters.', 'Select templates by content type and test missing or malformed fields.', 'A non-proxy integration also maps backend response status and body.', 'A Lambda proxy integration instead passes the standard event contract.'], 'Use a mapping template when the client and backend contracts differ.'),
35: ('Import an OpenAPI contract', ['OpenAPI spec', 'API import', 'Methods / models', 'Deployment'], ['Describe paths, methods, schemas and supported API Gateway extensions.', 'Import or update an API definition; inspect changes to integrations and security.', 'Validate the deployed stage rather than assuming import published it.', 'Export the API definition for version control and review.'], 'A definition is the configuration source; deployment is the live release.'),
36: ('Validate before integration', ['Request', 'Validator', 'Model / params', 'Backend'], ['REST request validators can check required parameters and request body.', 'A model defines a supported JSON schema for the body content type.', 'A failed request is rejected by API Gateway before the integration runs.', 'Validation does not replace backend authorization or business checks.'], 'Reject malformed requests at the gateway, then validate domain rules downstream.'),
48: ('WebSocket route selection', ['Client frame', 'Route expression', 'Route key', 'Integration'], ['The route selection expression evaluates message data such as $request.body.action.', 'A matching route key selects its configured integration.', 'The $default route handles messages without a matching key.', 'Integration responses shape what the route returns to the client.'], 'A route key depends on the message body and selection expression.'),
51: ('Release a versioned REST API', ['Lambda version', 'Alias', 'REST stage', 'Canary'], ['Publish a Lambda version and update the alias target deliberately.', 'Use a stage variable only where the integration URI resolves that alias.', 'Deploy API changes, then send a small percentage through the canary.', 'Observe errors and latency; revert the canary or alias on regression.'], 'Test both gateway deployment and Lambda version routing.'),
52: ('Map, validate, then integrate', ['Client request', 'Validator', 'VTL mapping', 'Service'], ['Define required path, query and body fields in a REST API request model.', 'Reject invalid requests with a gateway 4xx before backend invocation.', 'Transform a valid request into the integration contract with VTL.', 'Test request and response mappings with realistic error payloads.'], 'Validation and transformation solve separate contract problems.'),
53: ('Find the API bottleneck', ['Client', 'Gateway cache', 'Throttle quota', 'Integration'], ['Check whether a method cache hit bypasses a backend call.', 'A 429 indicates throttling or quota; inspect the applicable limit.', 'Compare Latency with IntegrationLatency to locate gateway versus backend delay.', 'Separate 4xx client/configuration failures from 5xx service or integration failures.'], 'Use status and latency signals before changing capacity or cache.'),
54: ('Four API security boundaries', ['Browser CORS', 'Identity auth', 'Resource policy', 'Backend IAM'], ['CORS controls browser access to responses, not caller authorization.', 'IAM, Cognito and Lambda authorizers authenticate or authorize requests.', 'A resource policy restricts who or which network path can invoke the API.', 'An integration role grants backend access; an API key is not caller authorization.'], 'Combine browser, caller, API and backend controls deliberately.'),
55: ('WebSocket message lifecycle', ['Connect', 'Connection ID', 'Post message', 'Disconnect'], ['Authorize $connect and store the connection ID for later delivery.', 'A route integration processes client frames using the route key.', 'The backend posts to the callback management API for server-initiated messages.', 'Handle stale connections and remove state on $disconnect.'], 'A WebSocket backend needs connection state and callback permissions.'),
}

W,H=2048,1152
COLORS=['#16e4f4','#ffab25','#ad78ff','#63e6ac']
def font(size,bold=False): return ImageFont.truetype(BOLD if bold else FONT,size)
def wrapped(draw,text,f,max_width):
    words=text.split(); lines=[]; line=''
    for word in words:
        test=(line+' '+word).strip()
        if draw.textbbox((0,0),test,font=f)[2] > max_width and line:
            lines.append(line);line=word
        else: line=test
    if line:lines.append(line)
    return lines
def txt(draw,xy,s,size,color='#f7faff',bold=False,maxw=None,spacing=9):
    f=font(size,bold); lines=wrapped(draw,s,f,maxw) if maxw else [s]
    x,y=xy
    for line in lines: draw.text((x,y),line,font=f,fill=color,stroke_width=0);y+=size+spacing
    return y
def rounded(draw,box,r,fill,outline=None,width=2):draw.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=width)
def render(n,data):
    title,nodes,notes,takeaway=data
    im=Image.new('RGB',(W,H)); pix=im.load()
    for y in range(H):
        for x in range(W):
            t=x/W; v=y/H
            pix[x,y]=(int(3+9*t+3*v),int(13+11*t+3*v),int(32+23*t+4*v))
    glow=Image.new('RGBA',(W,H));g=ImageDraw.Draw(glow)
    g.ellipse((-300,-500,800,500),fill=(0,188,255,46));g.ellipse((1350,-420,2250,480),fill=(151,67,255,35))
    glow=glow.filter(ImageFilter.GaussianBlur(120));im=Image.alpha_composite(im.convert('RGBA'),glow)
    d=ImageDraw.Draw(im)
    d.line((35,96,2013,96),fill='#24d9f4',width=4)
    for i,c in enumerate(COLORS[:3]):d.polygon([(95+i*50,25),(123+i*50,25),(155+i*50,70),(127+i*50,70)],fill=c)
    txt(d,(340,17),title,54,bold=True,maxw=1590,spacing=3)
    rounded(d,(38,122,2010,640),30,'#07152c','#20d9f2',4)
    txt(d,(72,142),'REQUEST PATH / DECISION FLOW',25,'#26dff4',True)
    # Four connected stations. Alternate the emphasis and explanatory captions.
    xs=[76,575,1074,1573]; y0=235
    for i,(x,label) in enumerate(zip(xs,nodes)):
        c=COLORS[(i+n)%4]
        rounded(d,(x+11,y0+13,x+431,y0+288),26,'#020a17')
        rounded(d,(x,y0,x+420,y0+275),26,'#0d2040',c,5)
        # Large technical glyph: a network/service boundary with a numbered port.
        d.ellipse((x+143,y0+24,x+277,y0+158),outline=c,width=7)
        d.ellipse((x+177,y0+58,x+243,y0+124),fill=c)
        d.line((x+210,y0+17,x+210,y0+167),fill=c,width=3)
        d.line((x+135,y0+91,x+285,y0+91),fill=c,width=3)
        rounded(d,(x+20,y0+20,x+76,y0+76),14,c)
        d.text((x+37,y0+27),str(i+1),font=font(29,True),fill='#07152c')
        lines=wrapped(d,label,font(34,True),370)
        ty=y0+188 if len(lines)==1 else y0+170
        for line in lines:
            box=d.textbbox((0,0),line,font=font(34,True));d.text((x+(420-(box[2]-box[0]))/2,ty),line,font=font(34,True),fill='#f7faff');ty+=43
        if i<3 and n not in {3,15,24,54}:
            d.line((x+423,y0+135,x+489,y0+135),fill='#ecf5ff',width=6)
            d.polygon([(x+489,y0+135),(x+469,y0+123),(x+469,y0+147)],fill='#ecf5ff')
    rounded(d,(38,665,2010,1007),30,'#0a1b37','#9d74ec',4)
    txt(d,(74,685),'HOW TO APPLY IT',27,'#b692ff',True)
    # Four specific rules in a compact comparison table.
    for i,note in enumerate(notes):
        yy=735+i*64
        if i%2==0:rounded(d,(70,yy-4,1975,yy+57),10,'#112746')
        rounded(d,(90,yy+6,132,yy+46),10,COLORS[(i+n)%4])
        txt(d,(155,yy+7),note,25,maxw=1780)
    rounded(d,(38,1027,2010,1130),24,'#35200e','#ffad28',4)
    txt(d,(68,1050),'REMEMBER',25,'#ffad28',True)
    txt(d,(255,1045),takeaway,33,bold=True,maxw=1720)
    d.text((1900,1088),f'{n:02d} / 55',font=font(20),fill='#8ea6c9')
    im.convert('RGB').save(OUT/f'slide-{n:02d}.webp','WEBP',quality=94,method=6)

if __name__=='__main__':
    for n,data in SLIDES.items():render(n,data)
    print(f'Rendered {len(SLIDES)} visuals at {W}x{H} in {OUT}')
