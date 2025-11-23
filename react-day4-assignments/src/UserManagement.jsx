import React, { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [errorUsers, setErrorUsers] = useState("");
  const [errorPosts, setErrorPosts] = useState("");

  // ✅ useEffect #1 — Fetch Users
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        setErrorUsers("");

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorUsers("Error fetching users");
        }
      }
      setLoadingUsers(false);
    };

    fetchUsers();

    // ✅ Cleanup
    return () => controller.abort();
  }, []);

  // ✅ useEffect #2 — Fetch Posts When User Selected
  useEffect(() => {
    if (!selectedUser) return;

    const controller = new AbortController();
    const fetchPosts = async () => {
        try {
          setLoadingPosts(true);
          setErrorPosts("");
  
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${selectedUser.id}/posts`,
            { signal: controller.signal }
          );
  
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrorPosts("Error fetching posts");
          }
        }
        setLoadingPosts(false);
      };

    fetchPosts();

    // ✅ Cleanup
    return () => controller.abort();
  }, [selectedUser]);

  // ✅ useEffect #3 — Search Filter
  useEffect(() => {
    const result = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management System</h2>

      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loadingUsers && <p>Loading users...</p>}
      {errorUsers && <p style={{ color: "red" }}>{errorUsers}</p>}

      {!loadingUsers && !errorUsers && (
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: "pointer" }}
            >
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div>
          <h3>Details</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>

          <h4>Posts</h4>

          {loadingPosts && <p>Loading posts...</p>}
          {errorPosts && <p style={{ color: "red" }}>{errorPosts}</p>}

          {!loadingPosts &&
            !errorPosts &&
            posts.map((post) => <p key={post.id}>{post.title}</p>)}
        </div>
      )}
    </div>
  );
}

export default UserManagement;