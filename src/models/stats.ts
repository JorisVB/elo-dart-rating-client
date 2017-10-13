export interface Stats {
    period: string;
    matchStat: MatchStat;    
    matchStatsAgainst: MatchStat[];    
    ratingStat: RatingStat;    
}

export interface MatchStat {
    won: number;
    lost: number;
}

export interface RatingStat {
    current: number;
    high: number;
    low: number;
}