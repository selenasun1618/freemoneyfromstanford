import { useFormState } from "react-dom";

export enum AcademicPosition {
    Undergraduate = 'Undergraduate',
    MastersStudent = 'MastersStudent',
    Coterm = 'Coterm',
    PhD = 'PhD',
    Postdoc = 'Postdoc',
    Faculty = 'Faculty',
    Other = 'Other',
}

export enum VSOType {
    Undergraduate,
    Graduate,
    None
}

function SearchPanel() {
    type SearchState = {
        searchString: string,
        position: AcademicPosition,
        representingVSO: VSOType,

    }

    let [searchState, searchAction] = useFormState(runSearch, {
        searchString: '',
        position: AcademicPosition.Other,
        representingVSO: VSOType.None,
    });

    async function runSearch(state: SearchState, formData: FormData) {
        'use server';
        const rawFormData = {

        };
    }

    <form className="flex flex-col grow bg-slate-100 p-4 gap-4 mb-4" action={searchAction}>

        <div className="my-2 mx-3 flex flex-row grow">
            <input type="search" placeholder="Search grants..." enterKeyHint="Search"
                   name="f-search"
                   className="rounded-l-3xl py-3 pl-6 pr-3 flex-grow bg-slate-200 text-slate-900 focus:outline-rose-500"
                   value={searchState.searchString}
                   aria-label="Search grants"
            />
            <input type="submit" value="Search"
                   className="rounded-r-3xl py-3 px-4 bg-rose-500 text-rose-50"
            />
        </div>

        <fieldset>
            <legend>Please select your academic position:</legend>
            <div className="flex flex-row flex-wrap gap-3">
                {% for ident in identity_list %}
                <label>
                    <input type="radio" name="f-ident" value="{{ ident.form_value() }}"
                           {% if ident.is_eq(selected_identity) %} checked {% endif %}
                    />
                    {{ident.form_label()}}
                </label>
                {% endfor %}
            </div>
        </fieldset>
        <div>
            <label>
                <!-- TODO: difference between undergraduate vs. graduate VSOs, other types? -->
                <input type="checkbox" name="f-repr-vso" {% if representing_vso %} checked {% endif %} />
                I'm seeking a grant as part of the leadership of a VSO.
            </label>
        </div>

        <div>
            <input type="checkbox" id="FMFS_search_amount_limits" name="f-filter-amount"
                   {% if filter_amount.0 %} checked {% endif %} />
            <label htmlFor="FMFS_search_amount_limits" className="ml-6">Filter by grant amount</label><br/>
            <div className="border border-slate-600 p-4">
                <label htmlFor="FMFS_search_amount_min">Minimum:</label>
                <!-- px-6 so the rounding works proper -->
                <input type="text" inputMode="numeric" id="FMFS_search_amount_min" name="f-filter-lowest"
                       className="rounded-3xl py-3 px-6 w-48 bg-slate-200 text-slate-900 focus:outline-rose-500"
                       placeholder="Minimum (USD)"
                       {% if filter_amount.0 %}
                       value="{{ filter_amount.1 }}"
                       {% endif %}
                />
                &nbsp;/&nbsp;
                <label htmlFor="FMFS_search_amount_max">Maximum:</label>
                <input type="text" inputMode="numeric" id="FMFS_search_amount_max" name="f-filter-highest"
                       className="rounded-3xl py-3 px-6 w-48 bg-slate-200 text-slate-900 focus:outline-rose-500"
                       placeholder="Maximum (USD)"
                       {% if filter_amount.0 %}
                       value="{{ filter_amount.2 }}"
                       {% endif %}
                />
            </div>
        </div>

        <div>
            <input type="checkbox" id="FMFS_search_deadline" name="f-filter-deadline"
                   {% if filter_deadline.0 %} checked {% endif %} />
            <label htmlFor="FMFS_search_deadline" className="ml-6">Filter by deadline</label>
            <div className="border border-slate-600 p-4">
                <label htmlFor="FMFS_search_deadline_soonest">Earliest:</label>
                <input type="date" id="FMFS_search_deadline_soonest" name="f-filter-soonest"
                       className="rounded-3xl py-3 px-6 w-40 bg-slate-200 text-slate-900 focus:outline-rose-500"
                />
                &nbsp;/&nbsp;
                <label htmlFor="FMFS_search_deadline_latest">Latest:</label>
                <input type="date" id="FMFS_search_deadline_latest" name="f-filter-latest"
                       className="rounded-3xl py-3 px-6 w-40 bg-slate-200 text-slate-900 focus:outline-rose-500"
                />
            </div>
        </div>

        <div className="border border-slate-600 p-4 md:flex gap-6">
            <fieldset className="inline">
                <legend className="float-left mr-2"><b>Sort results by:</b></legend>
                <label>
                    <input type="radio" name="f-sort-by" value="amount"
                           {% if sorting_pref.sort_by == SortByField::Amount %}
                           checked
                           {% endif %} />
                    Award
                </label>
                <label>
                    <input type="radio" name="f-sort-by" value="deadline"
                           {% if sorting_pref.sort_by == SortByField::Deadline %}
                           checked
                           {% endif %} />
                    Deadline
                </label>
            </fieldset>
            <fieldset className="inline">
                <legend className="float-left mr-2"><b>In order:</b></legend>
                <label>
                    <input type="radio" id="FMFS_sort_ascending" name="f-sort-order" value="ascending"
                           {% if sorting_pref.sort_dir == SortDirection::Ascending %} checked {% endif %} />
                    Ascending
                </label>
                <label>
                    <input type="radio" id="FMFS_sort_descending" name="f-sort-order" value="descending"
                           {% if sorting_pref.sort_dir == SortDirection::Descending %} checked {% endif %} />
                    Descending
                </label>
            </fieldset>
        </div>

        <div className="self-end">
            <input type="reset" value="Reset" className="underline"/>
        </div>

    </form>
}

export default function SearchPage() {

}