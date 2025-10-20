import { getTranslations } from "next-intl/server";

export async function DocumentNotFoundComponent() {
  const t = await getTranslations("DocsError.notFound");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
