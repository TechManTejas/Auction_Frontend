export interface IAuction {
    _id: string;
    winner_id: string | null;
    winner_bid_amount: number;
    title: string;
    description: string;
    image: string;
    start_datetime: Date;
    duration: number;
    durationHours: number;
    durationMinutes: number;
    opening_bid_amount: number;
    logs: Record<string, unknown>[];
    raise_options: Record<string, unknown>;
    status: 'Not Started' | 'In Progress' | 'Ended';
}