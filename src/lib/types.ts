export interface Event {
  bride: string;
  groom: string;
  wedding_date: string;
  hall_layout_image: string;
  tables: Table[];
}

export interface Table {
  table_no: string;
  seat_availabe: number;
  seat_assigned: number;
  position_x: number;
  position_y: number;
  families?: Family[];
}

export interface Family {
  table_id: number;
  name: string;
  member_count: number;
  phone_number: string;
  checked_at: string;
}

export interface Guest {
  table_no: string;
  name: string;
  member_count: number;
  phone_number?: string;
}
