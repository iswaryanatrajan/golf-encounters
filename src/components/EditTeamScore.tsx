import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "./Player";

type Product = {
  name: string;
  color: string;
  category: string;
  price: string;
};

const products: Product[] = [
  { name: "PAR", color: "4", category: "4", price: "4" },
];

type EditTeamScoreProps = {};
const EditTeamScore: React.FC<EditTeamScoreProps> = () => {
  const { isCreated, singleEvent } = singleEventContextStore();
  const hole = singleEvent ? singleEvent?.selectedHoles : [];
  const par = singleEvent ? singleEvent?.shotsPerHoles : [];
  const newArrayHole = hole?.split(",").map(Number);

  const newArraypar = par?.split(",").map(Number);
  const navigate = useNavigate();
  if (!Array.isArray(newArrayHole) && !Array.isArray(newArraypar)) {
    return null; // Or render a fallback UI
  }
  

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const handleNavigateHome = () => {
    navigate("/ongoing-indiviual-score");
  };
  return (
    <div className="shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] py-20 px-10 my-10 w-full">
      <div className="flex gap-4">
        <img
          className="w-[57px] h-[103px]"
          alt=""
          src="/img/rectangle-1248@2x.png"
        />
        <b className="relative left-[-4px] top-[35px] text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
          {t("SCORING_CATEGORY")}
        </b>
        <img
          className="w-[57px] h-[103px] object-cover"
          alt=""
          src="/img/flag.png"
        />
      </div>
      <div className="flex justify-center my-6 sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
            <tr className="">
              <th scope="col" className="px-2 py-3">
                HOLE
              </th>
              {[...Array(18)].map((_, i) => {
                const newArrayHoleNumbers = newArrayHole.map(Number);
                const match = newArrayHoleNumbers.includes(i + 1);

                const bgColor = match ? "bg-red" : "";
                return (
                  <th
                    key={i}
                    scope="col"
                    className={`px-2 py-3 ${isCreated && bgColor}`}
                  >
                    {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {products.map((product, index) => (
              <tr key={index} className="mt-10 shadow-md g">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.name}
                </th>
                {newArraypar?.map((score: any) => (
                  <th scope="col" className="px-2 py-3">
                    {score}
                  </th>
                ))}
              </tr>
            ))}
           
          </tbody>
        </table>
      </div>
      <button
        onClick={handleNavigateHome}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
      >
        {t("VIEW_FULL")}
      </button>
    </div>
  );
};

export default EditTeamScore;
