import { useEffect } from "react";

type UseSeoOptions = {
  title: string;
  description: string;
  image?: string;
  robots?: string;
};

function setMetaByName(name: string, content: string) {
  const element = document.querySelector(`meta[name="${name}"]`);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setMetaByProperty(property: string, content: string) {
  const element = document.querySelector(`meta[property="${property}"]`);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setCanonicalUrl(url: string) {
  const element = document.querySelector('link[rel="canonical"]');
  if (element) {
    element.setAttribute("href", url);
  }
}

export function useSeo({ title, description, image, robots = "index, follow" }: UseSeoOptions) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = window.location.href;
    const defaultImage = `${window.location.origin}/InvestPoint-logo-zoomed-removebg-preview.png`;
    const finalImage = image ?? defaultImage;

    setMetaByName("description", description);
    setMetaByName("robots", robots);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:image", finalImage);
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", finalImage);
    setCanonicalUrl(canonicalUrl);
  }, [title, description, image, robots]);
}
