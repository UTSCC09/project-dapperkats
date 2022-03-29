import { gql } from '@apollo/client';

//TODO PAGINATION
export const Journey_Querys = {
    GET_JOURNEYS: gql`
        query GetJourneys {
            getJourneys {
                id,
                username,
                title,
                imageId,
                description,
                fromDate,
                toDate,
                suggestionsEnabled
            }
        }
    `,
    GET_JOURNEY: gql`
        query GetJourney($journeyId: ID!) {
            getJourney(journeyId: $journeyId) {
                id,
                username,
                title,
                imageId,
                description,
                fromDate,
                toDate,
                suggestionsEnabled
            }
        }
    `,
    GET_MARKERS: gql`
        query GetMarkers($journeyId: ID!) {
            getMarkers(journeyId: $journeyId) {
                id,
                journeyId,
                imageId,
                title,
                place,
                description,
                date,
                longitude,
                latitude
            }
        }
    `,
    GET_SUGGESTIONS: gql`
        query GetSuggestions($markerId: ID!) {
            getSuggestions(markerId: $markerId) {
                id,
                markerId,
                description,
                imageId,
                longitude,
                latitude,
                username,
                type
            }
        }
    `
}