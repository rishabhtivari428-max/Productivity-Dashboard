import activityInstance from "../api/activityInstance";

export async function createActivity(title) {
    const response = await activityInstance.post("activity/create", {
        title
    })
    return response.data
}

export async function getActivity() {
    const response = await activityInstance.get("activity/get")
    return response.data
}

export async function deleteActivity(id) {
    const response = await activityInstance.delete(`activity/delete/${id}`)
    return response.data
}