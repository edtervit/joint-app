import React from "react";

function Footer() {
  return (
    <div className="bg-gray bg-opacity-30 absolute p-4 w-full flex text-white items-center flex-wrap bottom-0 ">
      <div>
        <p>
          Contact us:{" "}
          <a href="mailto:ed@edtervit.co.uk" className="underline font-bold">
            ed@edtervit.co.uk
          </a>
        </p>
        <p>
          Like what we've made?{" "}
          <a
            href="https://ko-fi.com/edtervit"
            target="_blank"
            rel="noreferrer"
            className="underline font-bold"
          >
            Buy us a ko-fi
          </a>
        </p>
      </div>
      <div className="flex flex-col justify-self-end ml-auto">
        <p className="">
          Design by{" "}
          <a
            href="https://www.behance.net/melihkor"
            target="_blank"
            rel="noreferrer"
            className="underline font-bold"
          >
            Melih Kor
          </a>
        </p>
        <p className="">
          Concept and Code by{" "}
          <a
            href="https://www.edtervit.co.uk/"
            target="_blank"
            rel="noreferrer"
            className="underline font-bold"
          >
            Ed Tervit
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
