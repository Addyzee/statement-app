export interface AnalysisResponseInterface {
    the_pdf: string; 
    the_name: string; 
    analysis: {
      total_cashflow: {
        In: number;
        Out: number;
      };
      transaction_type_analysis: {
        types: string[];
        frequencies: Record<string, number>;
        amounts: {
          In: Record<string, number>;
          Out: Record<string, number>;
        };
      };
      accounts_analysis: {
        types: string[];
        frequencies: Record<string, number>;
        amounts: {
          In: Record<string, number>;
          Out: Record<string, number>;
        };
      };
    };
  }
  