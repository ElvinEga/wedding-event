interface Family {
  table_id: number;
  name: string;
  member_count: number;
  phone_number: string;
  checked_at: string | null;
}

interface Table {
  table_no: string;
  seat_availabe: number;
  seat_assigned: number;
  position_x: number;
  position_y: number;
  families?: Family[];
}

interface WeddingEvent {
  bride: string;
  groom: string;
  wedding_date: string;
  hall_layout_image: string;
  tables: Table[];
}

interface WedEvents {
  [key: string]: WeddingEvent;
}
export const wedEvents: WedEvents = {
  "sarah-wedding": {
    bride: "Sarah",
    groom: "Michael",
    wedding_date: "2025-06-15T18:00:00Z",
    hall_layout_image: "",
    tables: [
      {
        table_no: "1",
        seat_availabe: 2,
        seat_assigned: 8,
        position_x: 0.2,
        position_y: 0.3,
        families: [
          {
            table_id: 1,
            name: "Johnson",
            member_count: 4,
            phone_number: "555-123-4567",
            checked_at: "2025-06-15T19:30:00Z",
          },
          {
            table_id: 1,
            name: "Smith",
            member_count: 4,
            phone_number: "555-987-6543",
            checked_at: "2025-06-15T19:45:00Z",
          },
        ],
      },
      {
        table_no: "2",
        seat_availabe: 4,
        seat_assigned: 6,
        position_x: 0.5,
        position_y: 0.3,
        families: [
          {
            table_id: 2,
            name: "Williams",
            member_count: 3,
            phone_number: "555-456-7890",
            checked_at: "2025-06-15T19:15:00Z",
          },
          {
            table_id: 2,
            name: "Brown",
            member_count: 3,
            phone_number: "555-234-5678",
            checked_at: "2025-06-15T19:20:00Z",
          },
        ],
      },
      {
        table_no: "3",
        seat_availabe: 6,
        seat_assigned: 4,
        position_x: 0.8,
        position_y: 0.3,
        families: [
          {
            table_id: 3,
            name: "Davis",
            member_count: 4,
            phone_number: "555-345-6789",
            checked_at: null,
          },
        ],
      },
      {
        table_no: "4",
        seat_availabe: 5,
        seat_assigned: 5,
        position_x: 0.2,
        position_y: 0.7,
        families: [
          {
            table_id: 4,
            name: "Miller",
            member_count: 5,
            phone_number: "555-567-8901",
            checked_at: null,
          },
        ],
      },
      {
        table_no: "5",
        seat_availabe: 10,
        seat_assigned: 0,
        position_x: 0.5,
        position_y: 0.7,
        families: [],
      },
      {
        table_no: "6",
        seat_availabe: 0,
        seat_assigned: 10,
        position_x: 0.8,
        position_y: 0.7,
        families: [
          {
            table_id: 6,
            name: "Wilson",
            member_count: 6,
            phone_number: "555-678-9012",
            checked_at: "2025-06-15T18:45:00Z",
          },
          {
            table_id: 6,
            name: "Moore",
            member_count: 4,
            phone_number: "555-789-0123",
            checked_at: "2025-06-15T18:50:00Z",
          },
        ],
      },
    ],
  },
};
