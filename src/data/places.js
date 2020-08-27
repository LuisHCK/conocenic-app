import Api from "../api";
const path = "/places";

export default class Place {
    static list() {
        return Api.get(path)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static view(id) {
        return Api.get(`${path}/${id}`)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
