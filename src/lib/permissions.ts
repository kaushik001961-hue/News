
export const permissions = {

  ADMIN: [
    "*",
  ],

  EDITOR: [
    "posts",
    "media",
    "categories",
    "comments",
  ],

  REPORTER: [
    "own-posts",
    "media",
  ],

};

export function can(
  role: string,
  permission: string
) {

  if (role === "ADMIN") {

    return true;

  }

  return permissions[
    role as keyof typeof permissions
  ]?.includes(permission);

}
