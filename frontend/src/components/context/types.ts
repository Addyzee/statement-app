export type TransactionType = {
  Type: string;
  Amount: number;
  Percent?: number;
};

export type Response = {
  the_pdf: string;
  the_name: string;
  session_id: string;
  analysis: {
    summary: {
      total_cashflow: {
        In: number;
        Out: number;
      };
      period: {
        from: string;
        to: string;
      };
      top_accounts: {
        In: {
          Account_name: string;
          Type: string;
          Amount: number;
        };
        Out: {
          Account_name: string;
          Type: string;
          Amount: number;
        };
      };
      highest_months: {
        highest_in: {
          Month: string;
          Amount: number;
          percent_average_difference: number;
        };
        highest_out: {
          Month: string;
          Amount: number;
          percent_average_difference: number;
        };
      };
      average_monthly: {
        average_in: number;
        average_out: number;
      };
      safaricom_charges: {
        In: Record<string, TransactionType>;
        Out: TransactionType[];
      };
      filterable_headers: string[];
    };
    months_analysis: Array<{
      Month: string;
      In: number;
      Out: number;
    }>;
    transaction_type_analysis: {
      types: string[];
      frequencies: Record<string, number>;
      amounts: {
        In: {
          Main: TransactionType[] | undefined;
          Others:
            | Array<{
                Others: TransactionType[];
              }>
            | undefined;
        };
        Out: {
          Main: TransactionType[];
          Others:
            | Array<{
                Others: TransactionType[];
              }>
            | undefined;
        };
      };
      safaricom_charges: {
        In?: Record<string, TransactionType[]>;
        Out: TransactionType[];
      };
    };
    accounts_analysis: {
      accounts: Array<Partial<Record<string, string[]>>>;
      frequencies: Record<string, number>;
      amounts: {
        In: Array<{
          Account_name: string;
          Type: string;
          Amount: number;
        }>;
        Out: Array<{
          Account_name: string;
          Type: string;
          Amount: number;
        }>;
      };
      top_accounts: {
        In: {
          Account_name: string;
          Type: string;
          Amount: number;
        };
        Out: {
          Account_name: string;
          Type: string;
          Amount: number;
        };
      };
    };
  };
};
