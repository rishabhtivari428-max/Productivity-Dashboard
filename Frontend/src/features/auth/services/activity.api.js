import activityInstance from "../api/activityInstance";

export async function createActivity(title) {
    const response = await activityInstance.post("/create", {
        title
    })
    return response.data
}

export async function getActivity() {
    const response = await activityInstance.get("/get")
    return response.data
}

export async function deleteActivity(id) {
    const response = await activityInstance.delete(`/delete/${id}`)
    return response.data
}