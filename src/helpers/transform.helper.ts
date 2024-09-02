export function transformUser(user: any) {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
}

export function transformUsers(users: any) {
  return users.map((user: any) => {
    return {
      id: user._id,
      username: user.username,
      role: user.role,
    };
  });
}
