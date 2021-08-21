import * as superagent from "superagent";
export default class baseclass {
    private urlBase = "https://api.myanimelist.net/v2";
    private token: string;
    private agent: superagent.SuperAgentStatic & superagent.Request;

    constructor(access_token: string) {
        this.token = access_token;
        this.agent = superagent.agent().auth(this.token, {
            type: "bearer",
        });
    }

    private callback(
        request: superagent.SuperAgentRequest,
        resolve: (value: object | PromiseLike<object>) => void,
        reject: (reason?: any) => void
    ) {
        request
            .then((response: { body: any }) => resolve({ status: true, result: response.body }))
            .catch((error: { response: { text: string } }) =>
                reject(Object.assign({ status: false }, JSON.parse(error.response.text)))
            );
    }

    get(params: string, query: object): Promise<object> {
        const _url = `${this.urlBase}${params}`;
        const request = this.agent.get(_url).query(query);
        return new Promise((resolve, reject) => this.callback(request, resolve, reject));
    }

    del(animeOrManga: string, id: number): Promise<object> {
        const _url = `${this.urlBase}/${animeOrManga}/${id}/my_list_status`;
        const request = this.agent.delete(_url);
        return new Promise((resolve, reject) => this.callback(request, resolve, reject));
    }

    put(animeOrManga: string, id: number, query: object): Promise<object> {
        const _url = `${this.urlBase}/${animeOrManga}/${id}/my_list_status`;
        const cType = "application/x-www-form-urlencoded";
        const request = this.agent.put(_url).query(query).type(cType);
        return new Promise((resolve, reject) => this.callback(request, resolve, reject));
    }
}
