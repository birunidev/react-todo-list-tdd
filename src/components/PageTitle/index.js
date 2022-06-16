import React from "react";
import { formatDate } from "../../utils";

export default function PageTitle({ title, date }) {
  return (
    <div className="page-title text-white">
      <h1 className="text-4xl font-semibold mb-3" data-testid="page-title">
        {title}
      </h1>
      <p className="text-sm" data-testid="date">
        {formatDate(date)}
      </p>
    </div>
  );
}
