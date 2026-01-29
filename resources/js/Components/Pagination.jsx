import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link, index) => {
        const classes =
          "inline-block py-2 px-3 m-2 rounded-lg text-sm " +
          (link.active
            ? "bg-gray-950 text-gray-200"
            : "text-gray-200 hover:bg-gray-950");

        if (!link.url) {
          return (
            <span
              key={index}
              className={`${classes} !text-gray-500 cursor-not-allowed`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          );
        }

        return (
          <Link
            key={index}
            href={link.url}
            preserveScroll
            className={classes}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </nav>
  );
}
