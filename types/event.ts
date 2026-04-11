export interface TalentEvent {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    totalParticipants: number;
    status: 'upcoming' | 'active' | 'completed';
}

export interface BuilderRank {
    address: string;
    handle: string;
    score: number;
    rank: number;
    impactLevel: 1 | 2 | 3 | 4 | 5;
}

export interface EventMilestone {
    id: number;
    title: string;
    description: string;
    points: number;
    isCompleted: boolean;
}
