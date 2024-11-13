import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
interface CreatedEventPaginationProps {
  currentPage: number;
  pageSize: number;
  totalEvents: number;
  onPageChange: (newPage: number) => void;  
}

export function CreatedEventPagination({
  currentPage,
  pageSize,
  totalEvents,
  onPageChange,
}: CreatedEventPaginationProps) {
  const totalPages = Math.ceil(totalEvents / pageSize);
  const { t, i18n } = useTranslation();
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return pageNumbers;
  };

  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => onPageChange(index),
      className: "rounded-full",
    } as any);

  return (
    <div className="flex items-center justify-center gap-4 py-4 ">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" /> {t("PREV")}
      </Button>
      <div className="flex items-center gap-2 z-[-1]">{getPageNumbers()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        {t("NEXT")}<ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
      </Button>
    </div>
  );
}
