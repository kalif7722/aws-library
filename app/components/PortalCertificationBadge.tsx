"use client";
import {useState} from "react";
import {portalCertificationAsset} from "./portalCertificationAssets";
import "./PortalCertificationBadge.css";

export default function PortalCertificationBadge({cloud,code}:{cloud:string;code:string}){
  const src=portalCertificationAsset(cloud,code);
  const [failed,setFailed]=useState<string>();
  // The adjacent text already gives the credential name and exam code.
  return src&&src!==failed
    ? <span className="portal-certification-mark" aria-hidden="true"><img src={src} width={66} height={66} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailed(src)}/></span>
    : <span className="portal-certification-mark portal-certification-code" aria-hidden="true">{code||"Exam"}</span>;
}
