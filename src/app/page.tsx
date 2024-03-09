import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
      <main className="mb-auto flex flex-row justify-center">
          <div className="container mx-auto md:p-4">
              <h1 className={"text-center text-4xl font-bold my-6"}>
                  Need money for a <span className={"underline"}>project</span>, but unsure how to fund it?
              </h1>
              <h5 className={"text-center text-lg font-medium mt-1 mb-6"}>
                  Stanford can help, but the information can be spread out and difficult to navigate. Ergo us!<br/>
              </h5>

              <form className={"flex flex-col grow rounded-2xl bg-slate-500 px-5"}>
                  <h5 className={"text-center text-lg font-medium my-4 text-slate-50"}>
                      Search your topic below <ArrowDownIcon className={"w-4 h-6 inline"} />, and we can suggest some grants that might cover it!<br/>
                      (Note that this is not exhaustive, and we cannot represent Stanford)
                  </h5>
                  <div className={"my-2 mx-3 flex flex-row grow"}>
                      <input type="search" placeholder="Search grants..." enterKeyHint="search"
                             name="search"
                             className={"rounded-l-3xl py-3 pl-6 pr-3 flex-grow bg-slate-100 text-slate-900 focus:outline-rose-500"}
                      />
                      <input type="submit" formAction="/search" value="Search"
                             className={"rounded-r-3xl py-3 px-4 bg-rose-500 text-rose-50"}
                      />
                  </div>
                  <span className={"text-center mt-1 mb-3"}>
                Or go directly to our
                      &nbsp;<a href="/search" className={`underline text-blue-600`}>Advanced Search</a>&nbsp;
                page, or our
                      &nbsp;<a href="/list" className={`underline text-blue-600`}>list of grants</a>&nbsp;
            </span>
              </form>
          </div>
      </main>
  )
}
