import { useEffect, useState } from "react";

function Table() {

    const [alladmin, setAlladmin] = useState([]);

    useEffect(() => {
        const data = [
            {
                name: "sagar",
                email: "sagar@gmail.com",
                phone: "876126777",
                isActive: true
            },
            {
                name: "jay",
                email: "jay@gmail.com",
                phone: "871666777",
                isActive: false
            },
            {
                name: "Raj",
                email: "raj@gmail.com",
                phone: "91158565",
                isActive: true
            },
            {
                name: "neel",
                email: "neel@gmail.com",
                phone: "966552542",
                isActive: false
            }
        ];

        setAlladmin(data);
    }, []);

    return (
        <>
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Active</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        alladmin.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.isActive ? "Active" : "Inactive"}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
        </>
    );
}

export default Table;
