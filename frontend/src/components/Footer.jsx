export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-500 to-black  text-white text-center p-4 mt-auto rounded-t">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
}
