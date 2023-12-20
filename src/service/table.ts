import { ApiResponse } from "@/types/apiResponse";
import api from "./core";
import { TableMainData } from "@/types/table";

export const TableService = {
  getList() {
    return api.get<ApiResponse<TableMainData[]>>("search?country=Indonesia");
  },
};
