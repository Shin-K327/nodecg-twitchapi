export type TCommercial = {
  data: {
    length: 30 | 60 | 90 | 120 | 150 | 180;
  };
  result: {
    data: Array<{
      length: number;
      message: string;
      retry_after: number;
    }>;
  };
};

export type TChannelInfo = {
  data: null;
  result: {
    data: Array<{
      broadcaster_id: string;
      broadcaster_login: string;
      broadcaster_name: string;
      broadcaster_language: string;
      game_id: string;
      game_name: string;
      title: string;
      delay: number;
    }>;
  };
};

export type TPolls = {
  data: {
    title: string;
    choices: Array<{ title: string }>;
    channel_points_voting_enabled: boolean;
    channel_points_per_vote: number;
    duration: number;
  };
  result: boolean;
};

export type TPrediction = {
  data: {
    title: string;
    outcomes: Array<{ title: string }, { title: string }>;
    prediction_window: number;
  };
  result: {
    data: [
      {
        id: string;
        broadcaster_id: string;
        broadcaster_name: string;
        broadcaster_login: string;
        title: string;
        winning_outcome_id: string | null;
        outcomes: Array<{
          id: string;
          title: string;
          users: number;
          channel_points: number;
          top_predictors: string | null;
          color: 'BLUE' | 'PINK';
        }>;
        prediction_window: number;
        status: 'ACTIVE' | 'RESOLVE' | 'CANCELED' | 'LOCKED';
        created_at: string;
        ended_at: string | null;
        locked_at: string | null;
      }
    ];
  };
};

export type SubTypes =
  | 'channel.follow'
  | 'channel.prediction.begin'
  | 'channel.prediction.progress'
  | 'channel.prediction.lock'
  | 'channel.prediction.end';

export type TSubscription = {
  data: SubTypes;
  result: {
    data: Array<{
      id: string;
      status: string;
      type: SubTypes;
      version: string;
      cost: string;
      condition: {
        broadcaster_user_id: string;
        transport: {
          method: string;
          callback: string;
        };
        created_at: string;
      };
    }>;
    total: number;
    total_cost: number;
    max_total_cost: number;
  };
};

export type TSublist = {
  data: Array<{
    id: string;
    status: string;
    type: string;
    version: string;
    cost: number;
    condition: {
      broadcaster_user_id: string;
    };
    created_at: string;
    transport: {
      method: string;
      callback: string;
    };
  }>;
  total: number;
  total_cost: number;
  max_total_cost: number;
  pagination: object;
};
