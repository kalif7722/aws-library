"use client";
import {useCallback,useEffect,useRef,useState,type PointerEvent,type KeyboardEvent} from "react";
import CourseVideoCaptions from "./CourseVideoCaptions";
import {discoveryPartIds,discoveredLectures,readyRequestedPart} from "./sap-video-discovery.mjs";
import CourseVideoControls,{COURSE_VIDEO_SPEEDS,COURSE_VIDEO_SPEED_KEY,COURSE_VIDEO_AUTO_NEXT_KEY,formatVideoTime} from "./CourseVideoControls";

type Chapter={slide:number;title:string;startSeconds:number;durationSeconds:number};
type Ready={status:"ready";title:string;videoUrl:string;captionsUrl:string;transcriptUrl:string;durationSeconds:number;chapters:Chapter[]};
type Result=Ready|{status:"processing"};
type Lecture={id:string;title:string;start:number;end:number};
const LECTURES:Record<string,Lecture[]>={
  "15":[{id:"01",title:"Global Accelerator Routing and CloudFront Comparison",start:1,end:3},{id:"02",title:"CloudFront Caching, Origins and Private S3 Access",start:4,end:6},{id:"03",title:"CloudFront Caching Versus Replication and Custom Origin Security",start:7,end:9},{id:"04",title:"CloudFront Origin Failover, Geography and Price Class Decisions",start:10,end:12}],
  "09":[{id:"01",title:"S3 Object Semantics, Consistency and Authorization",start:1,end:3},{id:"02",title:"Private S3 Access, Encryption and Version Recovery",start:4,end:6},{id:"03",title:"Object Lock, CloudFront Origins and S3 Storage-Class Selection",start:7,end:9},{id:"04",title:"Glacier Retrieval, Intelligent-Tiering and Lifecycle Decisions",start:10,end:12},{id:"05",title:"Replication Architecture, Timing and S3 Event Processing",start:13,end:15},{id:"06",title:"EventBridge Routing, Prefix Scale and Multipart Uploads",start:16,end:18},{id:"07",title:"Incomplete Multipart Cleanup, Byte-Range Reads and Transfer Acceleration",start:19,end:21},{id:"08",title:"Legacy Select, Storage Class Analysis and Storage Lens Overview",start:22,end:24},{id:"09",title:"Storage Lens Cost, Protection, Activity and Metrics Tiers",start:25,end:28},{id:"10",title:"S3 Metadata Indexing, Static Delivery and Failure Recovery",start:29,end:31},{id:"11",title:"S3 Architecture Decision Framework and Static Delivery Alternatives",start:32,end:33},{id:"12",title:"Global S3 Entry, Legacy Features, Presigned Access and Audit Evidence",start:34,end:37}],
  "10":[{id:"01",title:"EBS Availability-Zone Scope, Volume Families and gp3 Performance",start:1,end:3},{id:"02",title:"EBS Performance Bottlenecks, Snapshot Consistency and Restore Readiness",start:4,end:6}],
  "08":[{id:"01",title:"Load Balancer Types, Listener Decisions and Network Boundaries",start:1,end:3},{id:"02",title:"Cross-Zone Balancing, Health Checks and ALB Routing",start:4,end:6},{id:"03",title:"ALB Target Types, TLS and Identity Boundaries",start:7,end:9},{id:"04",title:"ALB Selection Algorithms, Draining and Weighted Releases",start:10,end:12},{id:"05",title:"NLB Transport, TLS, Zonal Addresses and Flow Health",start:13,end:15},{id:"06",title:"PrivateLink, NLB-to-ALB and GWLB Stateful Inspection",start:16,end:18},{id:"07",title:"Load Balancer Security, Ingress Diagnostics and Design Selection",start:19,end:21},{id:"08",title:"Classic Load Balancer, Kubernetes Ingress and Zonal Cost Decisions",start:22,end:24}],
  "07":[{id:"01",title:"EC2 Family Selection, Burst Credits and Instance Lifecycle",start:1,end:3},{id:"02",title:"Repeatable EC2 Launches, Stateless Design and Capacity Purchasing",start:4,end:6},{id:"03",title:"Spot Recovery, EC2 Tenancy and Placement Groups",start:7,end:9},{id:"04",title:"ENA, EFA, HPC and Auto Scaling Capacity",start:10,end:12},{id:"05",title:"Target, Step, Scheduled and Predictive Auto Scaling",start:13,end:15},{id:"06",title:"Warm Pools, Lifecycle Hooks and Safe Instance Refresh",start:16,end:18},{id:"07",title:"EC2 Health, Safe Scale-In and Mixed Capacity Recovery",start:19,end:22},{id:"08",title:"Precision-Time Placement and EC2 Observability",start:23,end:24},{id:"09",title:"EC2 Recovery and HPC Storage and Scheduling",start:25,end:27},{id:"10",title:"Auto Scaling Process Controls and Safe Deployments",start:28,end:30},{id:"11",title:"Spot Fleet Allocation and Full Solution Architecture",start:31,end:32}],
  "06":[{id:"01",title:"Hybrid Connectivity Requirements, VPN and Gateway Scope",start:1,end:4},{id:"02",title:"VPN Routing and Performance, Direct Connect and VIF Types",start:5,end:8},{id:"03",title:"Direct Connect Gateway Prefixes, Hybrid Transit and BGP Policy",start:9,end:12},{id:"04",title:"Direct Connect LAG, Backup, Encryption and Private IP VPN",start:13,end:16},{id:"05",title:"Transit Gateway Connect and Hybrid Path Troubleshooting",start:17,end:18},{id:"06",title:"Hybrid Compute Placement, Outposts and Local Zones",start:19,end:22},{id:"07",title:"EKS and ECS Anywhere, Disconnected Operations and Hybrid Case",start:23,end:26},{id:"08",title:"VPN CloudHub, Client VPN Routing and Direct Connect SiteLink",start:27,end:30},{id:"09",title:"Shared Hybrid Services, Egress and VPN Path Selection",start:31,end:34},{id:"10",title:"Outposts Object Storage and Advanced VPN Connectivity",start:35,end:38},{id:"11",title:"Wavelength, Direct Connect Provisioning and LAG Resilience",start:39,end:41}],
  "05":[{id:"01",title:"DNS Fundamentals, Resolver Roles and Split-Horizon Views",start:1,end:3},{id:"02",title:"VPC DNS Settings, Private Zones and Namespace Precedence",start:4,end:6},{id:"03",title:"Hybrid Route 53 Resolver Inbound, Outbound and Resilience",start:7,end:10},{id:"04",title:"Shared Resolver Rules and Route 53 Profiles",start:11,end:12},{id:"05",title:"Hybrid PrivateLink DNS, DNS Firewall and Resolver Evidence",start:13,end:15},{id:"06",title:"DNS Record Choices, Health Signals and Route 53 Policies",start:16,end:18},{id:"07",title:"Multi-Region DNS, DNSSEC and Hybrid Resolution Diagnosis",start:19,end:22},{id:"08",title:"Route 53 IP Routing, Health Checks and Traffic Flow",start:23,end:25}],
  "04":[{id:"01",title:"VPC Fundamentals and Internet Egress",start:1,end:3},{id:"02",title:"Subnet Capacity, IPAM and Overlap Migration",start:4,end:6},{id:"03",title:"Route Selection and Security-Group versus NACL Decisions",start:7,end:8},{id:"04",title:"VPC Flow Logs, Private Endpoints and Effective Access",start:9,end:12},{id:"05",title:"VPC Peering and Transit Gateway Network Design",start:13,end:16},{id:"06",title:"Cloud WAN, PrivateLink and Connectivity Architecture Choices",start:17,end:20},{id:"07",title:"VPC Lattice Service Networks, Authorization and Routing",start:21,end:22},{id:"08",title:"Centralized Ingress, Egress and Stateful Inspection Architectures",start:23,end:27},{id:"09",title:"AWS WAF, Shield and Edge DDoS Resilience",start:28,end:29},{id:"10",title:"Layered Network Segmentation and the Data Perimeter",start:30,end:30},{id:"11",title:"IPv6 Address Planning, Dual Stack and Translation",start:31,end:35},{id:"12",title:"Multi-Region Entry and End-to-End Network Cost",start:36,end:37},{id:"13",title:"Architecture Scenarios and Network Design Validation",start:38,end:40},{id:"14",title:"NAT Instance Operations and VPC Flow Logs Troubleshooting",start:41,end:42}],
  "03":[{id:"01",title:"Encryption Boundaries, Envelope Encryption and KMS Key Choices",start:1,end:3},{id:"02",title:"KMS Authorization, Rotation and Multi-Region Keys",start:4,end:6},{id:"03",title:"S3, EBS and RDS Encryption Architecture Choices",start:7,end:8},{id:"04",title:"Encrypted S3 Access and Secrets Rotation",start:9,end:11},{id:"05",title:"TLS Handshake and Certificate Authority Operations",start:12,end:14},{id:"06",title:"ALB TLS, Mutual Authentication and Certificate Troubleshooting",start:15,end:17},{id:"07",title:"CloudHSM and Custom Key Custody",start:18,end:20},{id:"08",title:"Post-Quantum Cryptography and Migration",start:21,end:24},{id:"09",title:"Regulated Data Sharing and Encryption Design Decisions",start:25,end:26},{id:"10",title:"Parameter Store and Cross-Account Secrets Authorization",start:27,end:30},{id:"11",title:"KMS Material Origins and CloudHSM TLS",start:31,end:32}],
  "02":[{id:"01",title:"Building a Governed AWS Multi-Account Landing Zone",start:1,end:5},{id:"02",title:"Control Tower Guardrails — Preventive, Proactive, Detective, SCP and RCP",start:6,end:8},{id:"03",title:"Policy Exceptions, Audit Evidence and Security Data Pipelines",start:9,end:14},{id:"04",title:"Cross-Account Resource Sharing and Transit Gateway Routing",start:15,end:16},{id:"05",title:"Organization Compliance, Vulnerability, Patching and Governance Review",start:17,end:22},{id:"06",title:"Account Onboarding, Billing, Tagging and Organization Policy Governance",start:23,end:26},{id:"07",title:"Landing-Zone Drift, StackSets Deployment and Cost Governance",start:27,end:29},{id:"08",title:"Account Decommissioning, Control Tower Enrollment and Governance Troubleshooting",start:30,end:32}],
  "00":[{id:"01",title:"SAP-C03 Visual Course Introduction and Architecture Journey",start:1,end:5}],
  "01":[{id:"01",title:"AWS Request Principals, Credentials and Authorization",start:1,end:4},{id:"02",title:"Effective Permissions — Identity, Resource and Organizational Controls",start:5,end:8},{id:"03",title:"Cross-Account Role Trust, External ID and Service Role Access",start:9,end:13},{id:"04",title:"Workforce Federation, Identity Center, SAML, SCIM and OIDC Trust",start:14,end:18},{id:"05",title:"Cognito, OAuth and Tenant-Aware Application Authorization",start:19,end:22},{id:"06",title:"AWS Workload Identity — EKS, EC2, ECS, Lambda and Roles Anywhere",start:23,end:26},{id:"07",title:"Cross-Account Patterns, Data Perimeters and IAM Access Analyzer",start:27,end:30},{id:"08",title:"Verified Access, IAM Conditions and Least-Privilege Troubleshooting",start:31,end:34},{id:"09",title:"Vendor, Workforce and Customer Access Architecture Scenarios",start:35,end:38},{id:"10",title:"Pod Secrets, External Access Remediation and Identity Decision Review",start:39,end:44},{id:"11",title:"Directory Services, SAML Federation and AWS Trust",start:45,end:45},{id:"12",title:"Directory Architecture — Managed AD, Hybrid Trust and Resilience",start:46,end:48},{id:"13",title:"STS Session Types, IAM Conditions and Managed-Policy Boundaries",start:49,end:52}],
};
const MODULE_PATH="/courses/aws-solutions-architect-professional/visual/module-";
const AUTO_NEXT_KEY=COURSE_VIDEO_AUTO_NEXT_KEY;

export default function SapVideoLectures({moduleId,slideAssets}:{moduleId:string;slideAssets?:Readonly<Record<number,string>>}){
  const [activeId,setActive]=useState("01");
  const [discovery,setDiscovery]=useState<{moduleId:string;results:Record<string,Result>}>({moduleId,results:{}});
  const results=discovery.moduleId===moduleId?discovery.results:{};
  const entries=discoveredLectures(LECTURES[moduleId]??[],results);
  const pendingRequestedPart=useRef<string|null>(null);
  const [checking,setChecking]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [speed,setSpeed]=useState(1);
  const [position,setPosition]=useState(0);
  const [duration,setDuration]=useState(0);
  const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState(1);
  const [captionsOn,setCaptionsOn]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  const [hudVisible,setHudVisible]=useState(true);
  const [autoNext,setAutoNext]=useState(false);
  const [completed,setCompleted]=useState(false);
  const [notice,setNotice]=useState("");
  const [mediaError,setMediaError]=useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);
  const stageRef=useRef<HTMLDivElement>(null);
  const hudTimeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  const selected=entries.find(x=>x.id===activeId)??entries[0];
  const active=selected?.id??activeId;
  const result=results[active];
  const readyCount=entries.filter(lecture=>results[lecture.id]?.status==="ready").length;
  const ready=result?.status==="ready"?result:null;
  const storageKey=`sap-video-${moduleId}-${active}-position`;
  const completedKey=`sap-video-${moduleId}-${active}-complete`;
  const source=(n:number)=>moduleId==="10"?slideAssets?.[n]:`/course-visuals/sap-c03/module-${moduleId}/slide-${String(n).padStart(2,"0")}${moduleId==="07"&&n===27?"-v3":(moduleId==="09"&&n>=34&&n<=37)||(moduleId==="07"&&(n===24||(n>=25&&n<=26)||(n>=28&&n<=30)||(n>=31&&n<=32)))||(moduleId==="06"&&n>=31&&n<=41)||(moduleId==="05"&&n>=23&&n<=25)||(moduleId==="04"&&(n===8||n===9||n===11||n===41||n===42))?"-v2":""}.webp${moduleId==="00"?"?v=sap-m00-cover-v2":""}`;
  const currentIndex=entries.findIndex(x=>x.id===active);
  const previous=entries[currentIndex-1];
  const following=entries[currentIndex+1];
  const moduleIds=Object.keys(LECTURES).sort();
  const modulePosition=moduleIds.indexOf(moduleId);
  const previousModule=modulePosition>0?moduleIds[modulePosition-1]:undefined;
  const nextModule=modulePosition>=0?moduleIds[modulePosition+1]:undefined;

  const revealHud=useCallback((durationMs=2800)=>{
    setHudVisible(true);
    if(hudTimeout.current)clearTimeout(hudTimeout.current);
    hudTimeout.current=setTimeout(()=>setHudVisible(false),durationMs);
  },[]);
  useEffect(()=>()=>{if(hudTimeout.current)clearTimeout(hudTimeout.current);},[]);
  useEffect(()=>{
    const sync=()=>{const value=document.fullscreenElement===stageRef.current;setFullscreen(value);if(value)revealHud(3000);};
    document.addEventListener("fullscreenchange",sync);
    return()=>document.removeEventListener("fullscreenchange",sync);
  },[revealHud]);

  useEffect(()=>{
    const controller=new AbortController();
    const known=LECTURES[moduleId]??[];
    const requestedPart=new URLSearchParams(window.location.search).get("part");
    const parts=discoveryPartIds(moduleId,known,requestedPart);
    const knownRequest=known.find(item=>item.id===requestedPart);
    // Remediation links may select a familiar lecture immediately, or a
    // discovered lecture once ready. Neither path auto-plays.
    setActive(knownRequest?.id??known[0]?.id??"01");
    setAutoPlayPart(null);
    pendingRequestedPart.current=!knownRequest&&requestedPart&&parts.includes(requestedPart)?requestedPart:null;
    setDiscovery({moduleId,results:{}});
    setChecking(true);
    const alreadyReady:Record<string,Ready>={};
    let busy=false;
    const refresh=async()=>{
      if(busy || controller.signal.aborted)return;
      busy=true;
      try{
        const found=await Promise.all(parts.filter(id=>!alreadyReady[id]).map(async id=>{
          try{
            const res=await fetch(`/api/sap-video?module=${moduleId}&part=${id}`,
              {cache:"no-store",signal:controller.signal});
            const value=(res.ok?await res.json():{status:"processing"}) as Result;
            return [id,value] as const;
          }catch{return [id,{status:"processing"} as Result] as const;}
        }));
        if(controller.signal.aborted)return;
        // The M10 approved release objects are immutable. Poll only its
        // missing parts on this page; other modules keep their prior polling.
        if(moduleId==="10")for(const [id,value] of found)if(value.status==="ready")alreadyReady[id]=value;
        const nextResults:Record<string,Result>={...alreadyReady,...Object.fromEntries(found)};
        setDiscovery({moduleId,results:nextResults});
        const fromLink=readyRequestedPart(pendingRequestedPart.current,discoveredLectures(known,nextResults),nextResults);
        if(fromLink){pendingRequestedPart.current=null;setActive(fromLink);}
        setChecking(false);
      }finally{busy=false;}
    };
    void refresh();
    // Existing page sessions pick up verified R2 uploads without needing a refresh.
    const poll=setInterval(()=>void refresh(),30000);
    return()=>{controller.abort();clearInterval(poll);};
  },[moduleId]);

  useEffect(()=>{
    try{
      const stored=Number(localStorage.getItem(COURSE_VIDEO_SPEED_KEY)
        ??localStorage.getItem("sap-video-speed")??"1");
      if(COURSE_VIDEO_SPEEDS.some(value=>value===stored))setSpeed(stored);
      setAutoNext(localStorage.getItem(AUTO_NEXT_KEY)==="true");
    }catch{}
  },[]);
  useEffect(()=>{
    setPosition(0);setPlaying(false);setMuted(false);setVolume(1);
    setCaptionsOn(false);setMediaError(false);setNotice("");
    try{setCompleted(localStorage.getItem(completedKey)==="true");}catch{setCompleted(false);}
  },[completedKey]);

  const savePosition=(t:number)=>{
    if(!Number.isFinite(t)||t<0)return;
    try{localStorage.setItem(storageKey,String(t));}catch{}
  };
  const seek=(seconds:number)=>{
    const video=videoRef.current;
    if(!video||!Number.isFinite(seconds))return;
    const max=Number.isFinite(video.duration)?video.duration:(ready?.durationSeconds??seconds);
    const target=Math.min(Math.max(0,seconds),max>0?max:seconds);
    video.currentTime=target;setPosition(target);savePosition(target);
  };
  const togglePlay=()=>{
    const video=videoRef.current;
    if(!video)return;
    if(video.paused)void video.play().catch(()=>setNotice("Press Play to start this lecture."));
    else video.pause();
  };
  const changeSpeed=(rate:number)=>{
    if(!COURSE_VIDEO_SPEEDS.some(x=>x===rate))return;
    setSpeed(rate);
    if(videoRef.current)videoRef.current.playbackRate=rate;
    try{localStorage.setItem(COURSE_VIDEO_SPEED_KEY,String(rate));}catch{}
  };
  const toggleCaptions=()=>{
    const video=videoRef.current;
    if(!video)return;
    const next=!captionsOn;
    for(let i=0;i<video.textTracks.length;i++)video.textTracks[i].mode=next?"hidden":"disabled";
    setCaptionsOn(next);
  };
  const toggleMute=()=>{
    const video=videoRef.current;
    if(!video)return;
    video.muted=!video.muted;setMuted(video.muted);
  };
  const adjustVolume=(v:number)=>{
    const video=videoRef.current;
    if(!video)return;
    video.volume=Math.max(0,Math.min(1,v));video.muted=v===0;
    setVolume(video.volume);setMuted(video.muted);
  };
  const toggleFullscreen=async()=>{
    try{
      if(document.fullscreenElement===stageRef.current)await document.exitFullscreen();
      else if(!document.fullscreenElement&&stageRef.current?.requestFullscreen)await stageRef.current.requestFullscreen();
      else setNotice("Exit your current fullscreen view before opening this lecture.");
    }catch{setNotice("This browser could not open fullscreen navigation.");}
  };
  const choose=(id:string,autoPlay=false)=>{
    pendingRequestedPart.current=null;
    setActive(id);setNotice("");
    if(autoPlay){
      // Keyed video remount is needed; playback begins after canplay on the newly selected video.
      setAutoPlayPart(id);
    } else setAutoPlayPart(null);
  };
  const [autoPlayPart,setAutoPlayPart]=useState<string|null>(null);
  const changeAutoNext=(on:boolean)=>{
    setAutoNext(on);
    try{localStorage.setItem(AUTO_NEXT_KEY,String(on));}catch{}
  };
  const selectPrevious=()=>{
    if(previous)choose(previous.id);
    else if(previousModule)window.location.assign(MODULE_PATH+previousModule+"#video-lectures");
  };
  const selectNext=()=>{
    if(following)choose(following.id,true);
    else if(nextModule)window.location.assign(MODULE_PATH+nextModule+"#video-lectures");
  };
  const hasPrev=Boolean(previous||previousModule),hasNext=Boolean(following||nextModule);
  const markComplete=()=>{
    setCompleted(true);
    try{localStorage.setItem(completedKey,"true");}catch{}
  };
  const finish=()=>{
    setPlaying(false);markComplete();
    try{localStorage.removeItem(storageKey);}catch{}
    if(autoNext&&hasNext)selectNext();
  };
  const trackHud=(event:PointerEvent<HTMLDivElement>)=>{
    if(!fullscreen)return;
    if(event.pointerType==="touch"){revealHud(4000);return;}
    const area=event.currentTarget.getBoundingClientRect();
    const y=event.clientY-area.top,x=event.clientX-area.left;
    if(y<120||y>area.height-160||x<115||x>area.width-115)revealHud(2500);
  };
  const handleKeyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
    const target=event.target as HTMLElement;
    if(["INPUT","SELECT","TEXTAREA","BUTTON"].includes(target.tagName)||!ready)return;
    const key=event.key.toLowerCase();
    if(key==="arrowleft"){event.preventDefault();seek((videoRef.current?.currentTime??0)-5);}
    else if(key==="arrowright"){event.preventDefault();seek((videoRef.current?.currentTime??0)+5);}
    else if(key===" "){event.preventDefault();togglePlay();}
    else if(key==="c"){toggleCaptions();}
    else if(key==="f"){void toggleFullscreen();}
    if(fullscreen)revealHud(4000);
  };

  if(!entries.length)return null;
  return <section id="video-lectures" aria-label="Professional architecture video lectures" style={{margin:"26px auto 32px",scrollMarginTop:24}}>
    <style>{`
      .sap-video-shell{background:#fff;border:1px solid #d4e1f0;border-radius:20px;overflow:hidden;color:#162947;box-shadow:0 12px 32px #152d4612}
      .sap-video-head{background:linear-gradient(118deg,#0f1b3c,#154a7c 65%,#0b7089);color:#fff;padding:24px 26px}
      .sap-video-head strong{font-size:11px;letter-spacing:.12em;color:#bde7ff}
      .sap-video-head h2{font-size:clamp(21px,2.4vw,27px);margin:6px 0;color:white}
      .sap-video-head p{font-size:13px;line-height:1.6;color:#dceafa;margin:0}
      .sap-video-head a{font-size:13px;font-weight:700;color:#c0e9ff;text-decoration:underline}
      .sap-video-layout{display:grid;grid-template-columns:minmax(235px,310px) minmax(0,1fr);align-items:start}
      .sap-video-list{background:#f5f8fc;border-right:1px solid #dce5f1;padding:13px;display:flex;flex-direction:column;gap:5px;min-width:0;align-self:stretch}
      .sap-video-list-title{margin:4px 8px 12px;font-size:12px;font-weight:800;color:#405d7d;letter-spacing:.06em}
      .sap-video-lesson{display:flex;align-items:flex-start;width:100%;gap:12px;text-align:left;padding:13px 10px;background:transparent;color:#183353;border:1px solid transparent;border-radius:12px;cursor:pointer;font:inherit}
      .sap-video-lesson:hover{background:#e8f1fb;border-color:#cbdff2}
      .sap-video-lesson[aria-current="true"]{background:white;border-color:#65a8e6;box-shadow:0 3px 12px #11375d12}
      .sap-video-number{background:#dbeafa;border-radius:8px;padding:7px;min-width:34px;text-align:center;font-size:12px;font-weight:900;color:#13538e}
      .sap-video-lesson[aria-current="true"] .sap-video-number{background:#155a91;color:white}
      .sap-video-copy{min-width:0;flex:1}
      .sap-video-copy b{font-size:13px;line-height:1.35;display:block}
      .sap-video-copy small{font-size:11px;color:#637a91;line-height:1.5;display:block;margin-top:4px}
      .sap-video-status{display:inline-block;margin-top:5px;font-size:11px;font-weight:700;color:#227556}
      .sap-video-status.pending{color:#687990}
      .sap-video-main{min-width:0;padding:22px}
      .sap-video-main-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .sap-video-main-top h3{font-size:19px;margin:5px 0;color:#153956}
      .sap-video-main-top small{font-size:12px;color:#627b97}
      .sap-video-pill{padding:5px 10px;border-radius:9px;font-size:11px;font-weight:800;background:#e9f7ef;color:#187347}
      .sap-video-pill.pending{background:#eff3f8;color:#60728a}
      .sap-video-tools{display:flex;flex-wrap:wrap;align-items:center;gap:13px;margin:12px 0 16px;color:#546b84;font-size:12px}
      .sap-video-tools a{color:#1466b2;text-decoration:underline;font-weight:700}
      .sap-video-chapters{border:1px solid #e0e9f3;border-radius:12px;margin-top:15px;overflow:hidden;color:#1d5486}
      .sap-video-chapters summary{cursor:pointer;padding:12px 14px;font-size:13px;font-weight:800;background:#f4f8fd}
      .sap-video-chapter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;padding:12px}
      .sap-video-chapter{display:flex;align-items:center;gap:7px;padding:7px;background:#f4f8fc;border-radius:8px}
      .sap-video-chapter button{border:0;background:none;color:#1f4a70;cursor:pointer;text-align:left;font-size:12px;flex:1}
      .sap-video-chapter a{font-size:11px;color:#1761a4;white-space:nowrap}
      .sap-video-empty{border:1px dashed #bfd2e6;background:#f6f9fc;padding:24px;border-radius:12px;color:#506883;font-size:13px;line-height:1.7}
      @media(max-width:840px){.sap-video-layout{grid-template-columns:1fr}.sap-video-list{border-right:0;border-bottom:1px solid #dce5f1;max-height:340px;overflow-y:auto}.sap-video-main{padding:17px}.sap-video-chapter-grid{grid-template-columns:1fr}}
      .sap-video-stage{position:relative;display:flex;flex-direction:column;min-width:0;overflow:hidden;border-radius:12px;background:#061726}
      .sap-video-stage video{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#061726;cursor:pointer}
      .sap-video-stage:fullscreen{width:100vw;height:100dvh;max-width:none;border-radius:0;background:#03101e}
      .sap-video-stage:fullscreen video{flex:1;min-height:0;height:100%;width:100%;aspect-ratio:auto}
      .sap-video-stage:fullscreen .cv-controls{position:absolute;left:0;right:0;bottom:0;opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .22s ease,transform .22s ease;background:#061827ee}
      .sap-video-stage:fullscreen[data-hud="visible"] .cv-controls,
      .sap-video-stage:fullscreen .cv-controls:focus-within{opacity:1;transform:translateY(0);pointer-events:auto}
      .sap-video-fullscreen-nav{position:absolute;top:50%;left:0;right:0;display:flex;justify-content:space-between;pointer-events:none;transform:translateY(-50%);opacity:0;transition:opacity .2s}
      .sap-video-stage:fullscreen[data-hud="visible"] .sap-video-fullscreen-nav,
      .sap-video-stage:fullscreen .sap-video-fullscreen-nav:focus-within{opacity:1}
      .sap-video-fullscreen-nav button{pointer-events:auto;border:1px solid #527da2;border-radius:10px;padding:13px 17px;background:#0c2943dd;color:white;cursor:pointer;font-size:20px}
      .sap-video-fullscreen-nav button:disabled{opacity:.35;cursor:default}
      .sap-video-fullscreen-nav button{position:relative}
      .sap-video-fullscreen-nav button::after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 10px);left:0;width:max-content;max-width:min(330px,65vw);overflow-wrap:break-word;padding:9px 12px;border:1px solid #b9dffa;border-radius:8px;color:#fff;background:#0a233bed;box-shadow:0 8px 20px #0008;font-size:12px;font-weight:750;line-height:1.4;text-align:left;opacity:0;visibility:hidden;pointer-events:none}
      .sap-video-fullscreen-nav button:last-child::after{left:auto;right:0}
      .sap-video-fullscreen-nav button:not(:disabled):is(:hover,:focus-visible)::after{opacity:1;visibility:visible}
      @media(prefers-reduced-motion:reduce){.sap-video-stage:fullscreen .cv-controls,.sap-video-fullscreen-nav{transition:none}}
    `}</style>
    <div className="sap-video-shell">
      <div className="sap-video-head">
        <strong>SAP-C03 · VIDEO LEARNING PATH</strong>
        <h2>{`Module ${moduleId} · Architecture Video Lectures`}</h2>
        <p>Learn professional-level architecture decisions through concise visual walkthroughs. Choose a video or inspect the original SAP slides.</p>
        <div style={{display:"flex",gap:18,marginTop:14,flexWrap:"wrap"}}>
          <a href="#visual-lessons">Open visual slides ↓</a>
          <a href="/courses/aws-solutions-architect-professional">All course modules</a>
        </div>
      </div>
      <div className="sap-video-layout">
        <nav aria-label="Choose video lecture" className="sap-video-list">
          <div className="sap-video-list-title">PLAYLIST · {readyCount}/{entries.length} AVAILABLE</div>
          {entries.map(item=>{
            const itemResult=results[item.id];
            const isReady=itemResult?.status==="ready";
            return <button key={item.id} type="button" className="sap-video-lesson" onClick={()=>choose(item.id)} aria-current={item.id===active?"true":undefined}>
              <span className="sap-video-number">{item.id}</span>
              <span className="sap-video-copy">
                <b>{item.title}</b>
                <small>Slides {item.start}–{item.end}</small>
                <span className={isReady?"sap-video-status":"sap-video-status pending"}>{isReady?(completed&&item.id===active?"✓ Completed":`▶ Watch · ${formatVideoTime(itemResult.durationSeconds)}`):checking?"Checking video":"In preparation"}</span>
              </span>
            </button>;
          })}
        </nav>
        <div className="sap-video-main">
          <div className="sap-video-main-top">
            <div>
              <small>PART {selected.id}{entries.length===Number(entries[entries.length-1].id)?` OF ${String(entries.length).padStart(2,"0")}`:""} · SLIDES {selected.start}–{selected.end}</small>
              <h3>{selected.title}</h3>
              <small>Visual-first, architect-focused guided explanation</small>
            </div>
            <span className={ready?"sap-video-pill":"sap-video-pill pending"}>{ready?(completed?"✓ Completed":"Ready to watch"):"In preparation"}</span>
          </div>
          {ready&&!mediaError?<div>
          <div ref={stageRef} className="sap-video-stage" data-hud={hudVisible?"visible":"hidden"}
            tabIndex={fullscreen?0:undefined} onPointerMove={trackHud}
            onPointerDown={e=>{if(fullscreen&&e.pointerType==="touch")revealHud(4000);}}
            onFocus={()=>{if(fullscreen)revealHud(4000);}} onKeyDown={handleKeyboard}>
            <video key={ready.videoUrl} ref={videoRef} controls={false} playsInline preload="metadata"
              poster={source(moduleId==="10"?(ready.chapters[0]?.slide??selected.start):selected.start)} aria-label="Narrated lecture video. Use the player controls below."
              onClick={togglePlay} onDoubleClick={()=>void toggleFullscreen()}
              onError={()=>setMediaError(true)}
              onLoadedMetadata={e=>{
                const v=e.currentTarget;
                setDuration(Number.isFinite(v.duration)?v.duration:ready.durationSeconds);
                v.playbackRate=speed;
                for(let i=0;i<v.textTracks.length;i++)v.textTracks[i].mode="disabled";
                try{
                  const saved=Number(localStorage.getItem(storageKey)??"0");
                  if(saved>5&&saved<v.duration-5)v.currentTime=saved;
                }catch{}
              }}
              onCanPlay={e=>{
                if(autoPlayPart===active){setAutoPlayPart(null);void e.currentTarget.play().catch(()=>setNotice("Select Play to begin the next lecture."));}
              }}
              onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}
              onTimeUpdate={e=>{setPosition(e.currentTarget.currentTime);savePosition(e.currentTarget.currentTime);}}
              onEnded={finish}>
              <source src={ready.videoUrl} type="video/mp4"/>
              <track src={ready.captionsUrl} kind="subtitles" srcLang="en" label="English"/>
              Your browser does not support HTML5 video.
            </video>
            <CourseVideoCaptions src={ready.captionsUrl} position={position} enabled={captionsOn}/>
            {fullscreen&&<div className="sap-video-fullscreen-nav" role="group" aria-label="Fullscreen lecture navigation">
              <button type="button" disabled={!hasPrev} onClick={selectPrevious} aria-label="Previous lecture" title={previous?.title??(previousModule?`Module ${previousModule}`:"No previous video")} data-tooltip={previous?`Previous: ${previous.title}`:previousModule?`Previous module: ${previousModule}`:"No previous video"}>❮</button>
              <button type="button" disabled={!hasNext} onClick={selectNext} aria-label="Next lecture" title={following?.title??(nextModule?`Module ${nextModule}`:"No next video")} data-tooltip={following?`Next: ${following.title}`:nextModule?`Next module: ${nextModule}`:"No next video"}>❯</button>
            </div>}
            <CourseVideoControls playing={playing} position={position} duration={duration||ready.durationSeconds}
              playbackSpeed={speed} muted={muted} volume={volume} captionsOn={captionsOn} fullscreen={fullscreen}
              onTogglePlayback={togglePlay} onSkip={delta=>seek((videoRef.current?.currentTime??0)+delta)}
              onSeek={seek} onChangeSpeed={changeSpeed} onToggleCaptions={toggleCaptions}
              onToggleMute={toggleMute} onVolume={adjustVolume}
              onPrevious={hasPrev?selectPrevious:undefined} onNext={hasNext?selectNext:undefined}
              previousTitle={previous?.title??(previousModule?"Previous module":"")}
              nextTitle={following?.title??(nextModule?"Next module":"")}
              onFullscreen={()=>void toggleFullscreen()} onMarkComplete={markComplete} completed={completed}/>
          </div>
          <div className="sap-video-tools">
            <label style={{display:"inline-flex",gap:7,alignItems:"center",fontSize:13,color:"#284f71"}}>
              <input type="checkbox" checked={autoNext} onChange={e=>changeAutoNext(e.currentTarget.checked)}/>
              Auto-play next lecture
            </label>
            <span style={{fontSize:12,color:"#546b84"}}>{formatVideoTime(ready.durationSeconds)} · {ready.chapters.length} slide chapters</span>
            <a href={ready.transcriptUrl} target="_blank" rel="noopener noreferrer" >Read transcript</a>
            <a href={ready.videoUrl} target="_blank" rel="noopener noreferrer" >Open MP4</a>
          </div>
          {notice&&<p role="status" style={{color:"#91551b"}}>{notice}</p>}
          <details className="sap-video-chapters"><summary>Chapters — jump to any slide explanation</summary>
            <div className="sap-video-chapter-grid">
              {ready.chapters.map(ch=>{const slideUrl=source(ch.slide);return <div key={ch.slide} className="sap-video-chapter">
                <button type="button" onClick={()=>{seek(ch.startSeconds);void videoRef.current?.play().catch(()=>{});}}
                  >
                  {formatVideoTime(ch.startSeconds)} · {String(ch.slide).padStart(2,"0")} · {ch.title}
                </button>
                {slideUrl&&<a href={slideUrl} target="_blank" rel="noopener noreferrer"  aria-label={`Open original slide ${ch.slide}`}>Slide ↗</a>}
              </div>;})}
            </div>
          </details>
        </div>:<div role="status" className="sap-video-empty">
          {mediaError?"Video playback encountered a media error; the original slides are still available below.":checking?"Checking the narrated lecture on the media server…":"This video is being prepared. The source slides remain available below, and the full player appears after the MP4 and manifest are verified."}
        </div>}
        </div>
      </div>
    </div>
  </section>;
}
