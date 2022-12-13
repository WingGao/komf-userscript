import axios, {type AxiosInstance} from 'axios'
import type {IdentifyRequest, SearchResult} from '@/types/metadata'
import {useSettingsStore} from '@/stores/settings'

export default class KomfMetadataService {
    private http: AxiosInstance
    private settings = useSettingsStore()

    constructor(http: AxiosInstance) {
        this.http = http
    }

    async searchSeries(seriesName: string): Promise<SearchResult[]> {
        try {
            return (
                await this.http.get(`${this.settings.komfUrl}/${this.settings.mediaServer}/search`, {
                    params: {name: seriesName},
                    paramsSerializer: {indexes: null},
                })
            ).data
        } catch (e: unknown) {
            let msg = 'Failed to retrieve search results'

            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async identifySeries(request: IdentifyRequest) {
        try {
            await this.http.post(`${this.settings.komfUrl}/${this.settings.mediaServer}/identify`, request)
        } catch (e) {
            let msg = 'Failed to identify series'
            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async matchLibrary(libraryId: string) {
        try {
            await this.http.post(
                `${this.settings.komfUrl}/${this.settings.mediaServer}/match/library/${libraryId}`
            )
        } catch (e) {
            let msg = 'Failed to match library'
            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async matchSeries(seriesId: string) {
        try {
            await this.http.post(
                `${this.settings.komfUrl}/${this.settings.mediaServer}/match/series/${seriesId}`
            )
        } catch (e) {
            let msg = 'Failed to match series'
            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async resetSeries(seriesId: string) {
        try {
            await this.http.post(
                `${this.settings.komfUrl}/${this.settings.mediaServer}/reset/series/${seriesId}`
            )
        } catch (e) {
            let msg = 'Failed to reset series'
            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async resetLibrary(libraryId: string) {
        try {
            await this.http.post(
                `${this.settings.komfUrl}/${this.settings.mediaServer}/reset/library/${libraryId}`
            )
        } catch (e) {
            let msg = 'Failed to reset library'
            if (axios.isAxiosError(e)) {
                msg += `: ${e.message}`
            }
            throw new Error(msg)
        }
    }

    async checkConnection(url: string) {
        let data
        try {
            data = (await this.http.get(`${url}/${this.settings.mediaServer}/providers`)).data
        } catch (e) {
            let msg = 'Connection Failed'
            if (axios.isAxiosError(e)) {
                msg = e.message
            }
            throw new Error(msg)
        }

        if (!Array.isArray(data)) {
            throw new Error('Connection Failed')
        }
    }
}
