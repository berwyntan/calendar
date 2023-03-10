export interface bookingsType {
  code: string;
  date: string;
  end_time: string;
  name: string;
  start_time: string;
  status: string;
  type: string;
  user_uuid: string;
  uuid: string;
}

export interface statusType {
  name: string;
  visible: boolean;
  color: string;
}

export interface roomType {
  name: string;
  visible: boolean;
  color: string;
}

export interface brandType {
  name: string;
  visible: boolean;
  color: string;
}
