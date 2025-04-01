import React from "react";
import nationalHealthAuthority from "../../../../images/national-health-authority.svg";
import ParchaaLogo from "../../../../images/parchaa.svg";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-center text-3xl gap-2">
        <img src={ParchaaLogo} alt="ParchaaLogo" height={70} width={70} />
        <span className="text-[#4B6AF5]">{t("parchaa")}</span>
        <span className="text-[#14C4D9]">
          {t("for")} {t("MMUs")}
        </span>
      </div>
      <div className="mt-7 text-center text-4xl font-medium">
        <div className="text-primary mb-5 text-center ">
          {t("Digital")} {t("Care")}, {t("Anywhere")}
        </div>
      </div>

      <div className="flex my-10 justify-center item-center">
        <div className="text-lg me-8 font-medium text-[#6B7280]">
          {t("APPROVED")} {t("BY")}
        </div>
        <img src={nationalHealthAuthority} alt="nationalHealthAuthority" />
      </div>
    </div>
  );
};

export default Home;
