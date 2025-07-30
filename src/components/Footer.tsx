import { Instagram, Twitter, Github, Linkedin, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" w-full border-t pt-10 pb-6 px-6 md:px-12 text-sm">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        <div className="col-span-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={24} className=" -rotate-25" />
            <span className="text-lg font-bold">InvoicPay</span>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            Smart, simple & secure invoicing software built for modern teams.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1">
            <li className="hover:underline">
              <Link to="/invoices">Invoice</Link>
            </li>
            <li className="hover:underline">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:underline">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:underline">
              <Link to="/setting">Settings</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li className="hover:underline">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:underline">
              <Link to="/careers">Careers</Link>
            </li>
            <li className="hover:underline">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hover:underline">
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li className="hover:underline">
              <Link to="/support">Support</Link>
            </li>
            <li className="hover:underline">
              <Link to="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className=" space-y-1 mb-4">
            <li className="hover:underline">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li className="hover:underline">
              <Link to="/terms">Terms of Service</Link>
            </li>
          </ul>

          <div className="flex gap-4">
            <Link
              to="https://www.linkedin.com/in/abhishek-yadav-407331311"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              to="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
            </Link>
            <Link
              to="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} />
            </Link>
            <Link
              to="https://github.com/abhiyadav512"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} InvoicePay. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built with ❤️ by Abhishek</p>
      </div>
    </footer>
  );
};

export default Footer;
