import React from "react"

export default function UsersItem({ item }) {
  return (
    <tr>
      <td className="users-table-td">{item._id.slice(0,8)}...</td>
      <td className="users-table-td">{item.name}</td>
      <td className="users-table-td">{item.email}</td>
    </tr>
  )
}