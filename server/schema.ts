interface User {
        email: string,
        password: string,
        fullname: string,
        level: number,
        isAdmin: boolean,
}

// sign in with email

interface Complaint {
        complaint: string, /// "school toilet is really bad"
        createdAt: string,        /// "12-12312312312"

        type: string,

        isReviewed: boolean,
        replies: [
                {
                        reply: string,
                        adminId: string,
                }
        ],

        isClosed: boolean,
}



