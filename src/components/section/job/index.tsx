import { useTranslation } from "@/i18n/client";

export const Job = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-4xl">
        {t("job.title")}
        TEST
      </h1>
    </div>
  );
};
