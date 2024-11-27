import { Helmet } from "react-helmet-async";

interface MetaProps {
  title: string;
  description: string;
  canonicalUrl: string;
}

function Meta({ title, description, canonicalUrl }: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}

export default Meta;
