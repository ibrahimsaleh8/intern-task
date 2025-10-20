export type ErrorAxiosResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

export type SportDataType = {
  id: number;
  title: string;
  description: string;
};
export type MemberDataType = {
  id: number;
  email: string;
  name: string;
};
export type SubscriptionsDataType = {
  id: number;
  email: string;
  sport: string[];
};
