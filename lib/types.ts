export interface PitchDeckScores {

    market: {
        score: number
        reason: string
        delta: number
    },
    team: {
        score: number
        reason: string
        delta?: number

    },
    founder: {
        score: number
        reason: string
        delta?: number

    },
    product: {
        score: number
        reason: string
        delta?: number
    },
    traction: {
        score: number
        reason: string
        delta?: number

    },
    final: {
        score: number
        reason: string
        delta?: number
    }

}

export interface AnalysisChatMessage {
    id: string
    content: string
    role: string
}