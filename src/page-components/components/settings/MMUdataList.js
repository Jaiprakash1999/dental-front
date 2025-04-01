import React from "react";
import useGetMMUunitSync from "./hooks/useGetMMUunitSync";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import Skeleton from "react-loading-skeleton";

const MMUdataList = () => {
  const { t } = useTranslation();
  const { onSyncMMUData, isMMUsyncing, mmuUnitData, isMMUuploaading } =
    useGetMMUunitSync();
  const { Pinapaka, Cherla, Burgampadu, AID } = mmuUnitData || {};
  return (
    <div>
      <div className="flex mt-2 justify-between items-center">
        <div> MMU {t("Data Sync")}</div>

        <div>
          <PrimaryButton
            buttonName={t("MMU Sync Data")}
            disabled={isMMUuploaading}
            onClick={onSyncMMUData}
          />
        </div>
      </div>

      <div className="border mt-5">
        <div className="flex border-b justify-between text-secondary   bg-[#F9FAFB] p-2">
          <div className="w-[70%]"> {t("MMU Unit Name")}</div>
          <div className="w-[30%]">{t("Status")}</div>
        </div>

        <div className="p-2 w-full flex justify-between">
          <div className="w-[70%]">
            <div className="p-2 border-b">{t("Pinapaka")}</div>
            <div className="p-2 border-b">{t("Cherla")}</div>
            <div className="p-2 border-b">{t("Burgampadu")}</div>
            <div className="p-2 border-b">{t("AID")}</div>
          </div>
          <div className="w-[30%]">
            <div className="p-2 border-b">
              {isMMUsyncing ? (
                <Skeleton width={100} />
              ) : (
                <span className="text-primary">{Pinapaka}</span>
              )}
            </div>
            <div className="p-2 border-b">
              {isMMUsyncing ? (
                <Skeleton width={100} />
              ) : (
                <span className="text-primary">{Cherla}</span>
              )}
            </div>
            <div className="p-2 border-b">
              {isMMUsyncing ? (
                <Skeleton width={100} />
              ) : (
                <span className="text-primary">{Burgampadu}</span>
              )}
            </div>
            <div className="p-2 border-b">
              {isMMUsyncing ? (
                <Skeleton width={100} />
              ) : (
                <span className="text-primary">{AID}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMUdataList;
