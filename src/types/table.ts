import * as yup from "yup";

export type TableMainData = {
    name: string;
    web_pages: string;
    country: string;
    alpha_two_code: string;
    domains: string
};

export interface TableData extends TableMainData {
  name: string;
  web_pages: string;
  country: string;
  alpha_two_code: string;
  domains: string
}

export const TableSchema: any = yup.object().shape({
    name: yup.string().required().label("name"),
    web_pages: yup.string().required().label("web_pages"),
  });
