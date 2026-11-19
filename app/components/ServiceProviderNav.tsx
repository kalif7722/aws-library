import "./ServiceProviderNav.css";

export const serviceProviders = [
  {key:"aws", label:"AWS", href:"/services"},
  {key:"azure", label:"Azure", href:"/azure-services"},
  {key:"gcp", label:"Google Cloud", href:"/gcp-services"},
] as const;

type Provider = typeof serviceProviders[number]["key"];

export default function ServiceProviderNav({current}: {current:Provider}){
  return <nav className="portal-library-providers portal-provider-nav" aria-label="Cloud service directories">
    {serviceProviders.map(provider=><a key={provider.key} href={provider.href}
      aria-current={provider.key===current?"page":undefined}>{provider.label} services</a>)}
  </nav>;
}
