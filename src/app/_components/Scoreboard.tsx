"use client";

import { useContext, useState } from "react";
import { StateContext } from "../_provider/StateProvider";
import { api } from "~/trpc/react";

export function Scoreboard() {
  const { updateState } = useContext(StateContext);

  const [page, setPage] = useState(1);
  const pageSize = 7;

  const { data, isLoading } = api.card.getScore.useQuery({
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
          Scoreboard
        </h1>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                      Rank
                    </th>
                    <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                      Name
                    </th>
                    <th className="border-b px-6 py-4 text-left text-sm font-medium text-gray-600">
                      Moves Used Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.scores.map((score, index) => (
                    <tr
                      key={score.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-100`}
                    >
                      <td className="px-6 py-4 text-gray-700">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{score.name}</td>
                      <td className="px-6 py-4 text-gray-700">{score.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              {page > 1 && (
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                >
                  Previous
                </button>
              )}

              <span className="text-gray-700">
                {page} of {Math.ceil((data?.totalScores ?? 1) / pageSize)}
              </span>
              {(data?.scores?.length ?? 0) >= pageSize && (
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={(data?.scores?.length ?? 0) < pageSize}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <button
        className="mt-8 block w-full rounded-full bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={() => updateState("start")}
      >
        Go Back
      </button>
    </>
  );
}
