import { adminApi } from "@/lib/adminAxios"

export const getAdminMe = async () => {
    const res = await adminApi.get("/admin/me")
    return res.data
}

export const updateAdmin = async (payload) => {
    const res = await adminApi.put("/admin/update", payload)
    return res.data
}

export const getAdminCourses = async () => {
    const res = await adminApi.get("/admin/courses")
    return res.data
}

export const createCourse = async (formData) => {
    const res = await adminApi.post("/admin/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
}

export const updateCourse = async ({ courseId, formData }) => {
    const res = await adminApi.put(`/admin/update/${courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
}

export const deleteCourse = async (courseId) => {
    const res = await adminApi.delete(`/admin/delete/${courseId}`)
    return res.data
}
