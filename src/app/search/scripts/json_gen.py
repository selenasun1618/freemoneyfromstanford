from openai import OpenAI

def main():
    client = OpenAI()

    text = """
    SCI 2024 Equity Impact Research Grants
    https://seedfunding.stanford.edu/opportunities/sci-2024-equity-impact-research-grants
    
    In recent years, the incidence and mortality for most types of cancer in California have declined; however, disparities persist for historically marginalized communities. For example, the cancer incidence rate for all cancers combined is lower among Black women and men compared to non-Hispanic White women and men, but death rates are higher. The Stanford Cancer Institute (SCI), Office of Cancer Health Equity is pleased to offer a call for cancer health equity proposals. Applicants can respond to one or more of the tracks outlined below. The Stanford Cancer Institute serves Santa Clara, San Mateo, Santa Cruz, Alameda, Contra Costa, Monterey, San Benito, San Joaquin, Stanislaus, and Merced counties, prioritizing lung, breast, pancreatic, liver, and lymphoma cancers. For both tracks, we welcome proposals that focus on these counties and priority cancers in addition to the incorporation of data collection and/or analysis component.

 Challenge awards will be granted for 2 years and up to $100,000. Seed grant awards will be granted for 1 year and up to $50,000.  Proposals are due Monday, May 3rd, 2024, 5:00 pm Pacific Time.

Track #1: Challenge Award

Track 1 is focused on addressing strategies and methods to either increase or enhance opportunities for community-based screening interventions. This year we are partnering with our CAB as well as other key stakeholders to address barriers to screening to increase equitable opportunities for cancer screening and prevention. The SCI catchment area covers a ten county area that includes racially/ethnic diverse communities that experience significant barriers to screening leading to increased cancer risk and burden of disease. 

Proposals should include a component of community engagement and/or community partnership that focuses on delivering or improving screening efforts related to breast, pancreas, liver or lung cancer.

Track #2:  Seed Grants

We invite the submission of seed grant proposals to address and reduce cancer disparities among underserved populations in California. Applicants are not limited to a specific topic, cancer type, or study design. However, preference will be given to proposals that focus on counties served by the Stanford Cancer Institute and/or the following priority areas:

Understanding and addressing systemic, geographical and policy-driven factors that contribute to financial toxicity in underrepresented communities. Proposals may focus on investigating the effects of financial toxicity and its associated factors at the system and institutional levels, including, but not limited to, the following: 1) distribution of community benefit; 2) institutional/systemic racism; and 3) interrelated factors inherent to inequitable access to cancer treatment such as employment, income, community of residence and insurance status.  
 
Integrating cancer health equity and community engagement in the context of a basic science research program. SCI is seeking projects that integrate and apply a component of health equity addressing disparities in cancer risk, care or treatment. The research should focus on the SCI catchment area and optimally will yield actionable outcome that can be utilized by both community stakeholders and the associated research program to promote research integration in the community. Proposals are not required to focus on the entire SCI catchment area, but their findings should be applicable to an underrepresented community.
 
Leveraging real-world data to reduce cancer disparities in California. We are interested in supporting innovative projects that harness real-world data to reduce cancer disparities in underserved Northern Californian communities (especially in counties served by SCI). For example, applicants could propose a blueprint for co-creating a data ecosystem that, as its implemented and reaches maturity, can provide secure and easy access to a diverse portfolio of cancer-related datasets or develop a use case that has the potential to scale.
Program priorities 
Cancer Health Equity
Community Engagement
Research Integration
Eligibility: 
Open to Stanford faculty with PI eligibility (with UTL, MCL, NTLR faculty appointments) and Clinical Educator (CE) faculty with an approved PI waiver.
 
Clinical instructors, instructors, graduate students and post-doctoral scholars (clinical and non-clinical) may serve as co-PI or co-investigator, but are required to include a PI-eligible faculty member as lead PI on the application. 

Please note, University Research Agreements (URAs) now require COI (OPACS) for all Co-PIs. As a Co-PI on this project, your Conflicts of Interest (COI) needs to be done before this award amendment can be released in SERA. Please be sure to go into OPACS https://opacs.stanford.edu/ to complete your COI declarations for the noted project if you haven't done so

    ELIGIBILITY: 
    Academic Council Faculty
    Clinician Educators
    Instructors
    Medical Center Line Faculty
    Postdocs
    Students

    FUNDING: 
    Two types of awards with funding amounts of $50,000 to $100,000 will be available to support projects for 12 to 24 months in duration.
    """
    system_prompt = """
    Using the entered information, populate this json element:
    {
        "title": string,
        "description": string,
        "eligibility": Subset of ["Undergraduate", "MastersStudent", "Coterm", "PhD", "Postdoc", "Faculty", "VSO", "Other"],
        "amount_min": Int,
        "amount_max": Int,
        "url": string,
        "deadline": string,
        "next_cycle_start": string,
        "embedding": []
    }
    "description" should be copy-pasted sentences from the original description.
    "VSO" in the "eligibility" field is a student group. Any offerings for a student group should include "VSO" as eligible.
    "Coterm" is a 5 year master's program. All coterm students are Master's students and can qualify for Graduate funding.
    "embedding" should be kept empty.
    "deadline" and "next_cycle_start" should be in ISO 8601 format, and assume 11:59PM PT if the deadline time is not listed.
    "deadline" should be an empty string if the deadline has passed for this cycle.
    "next_cycle_start" is the anticipated next start date, and if only a deadline is given, the anticipated application open date should be 2 months before then. For example, "The application period closed on March 20, 2024" should translate to "next_cycle_start": "2023-01-20T00:00-08:00"
    """

    prompting = f"""
    Description:
    SERI 2024 Research Fellowship Application
    In summer 2024, the Stanford Existential Risks Initiative will fund 10-week full-time research projects dedicated to mitigating existential risks, with an emphasis on building a community of existential risk researchers via speaker events, discussion groups, social events, etc. Students will work with a mentor (a faculty member, postdoctoral scholar, or industry expert), who will provide weekly advising along with guidance on projects and their design. 

    We define a existential risk as one that could cause the collapse of human civilization or even the extinction of the human species. Prominent examples of human-driven existential risks include 1) nuclear war, 2) an infectious disease pandemic engineered by malevolent actors using synthetic biology, 3) hostile or uncontrolled deployments of artificial intelligence, and 4) climate change and other environmental degradation creating biological and physical conditions that thriving human civilizations would not survive. Existential risks projects could range from purely technical research to philosophical research.

    The program will run for 10 weeks from 6/24/24 to 8/29/24, and is open to all current Stanford students (both undergraduate and graduate). Participants will be paid a research stipend of $7,500 for their work. To apply, please fill out the form below. Applications will be considered on a rolling basis until May 15th, 2024.

    Email seri-contact@stanford.edu with any additional questions. We look forward to reading your application!

    JSON:
    "title": "SERI 2024 Research Fellowship",
    "description": "In summer 2024, the Stanford Existential Risks Initiative will fund 10-week full-time research projects dedicated to mitigating existential risks, with an emphasis on building a community of existential risk researchers via speaker events, discussion groups, social events, etc. Students will work with a mentor (a faculty member, postdoctoral scholar, or industry expert), who will provide weekly advising along with guidance on projects and their design. We define a existential risk as one that could cause the collapse of human civilization or even the extinction of the human species. Prominent examples of human-driven existential risks include 1) nuclear war, 2) an infectious disease pandemic engineered by malevolent actors using synthetic biology, 3) hostile or uncontrolled deployments of artificial intelligence, and 4) climate change and other environmental degradation creating biological and physical conditions that thriving human civilizations would not survive. Existential risks projects could range from purely technical research to philosophical research.",
    "eligibility": ["Undergraduate", "MastersStudent", "Coterm", "PhD"],
    "amount_min": 7500,
    "amount_max": 7500,
    "url": "https://docs.google.com/forms/d/e/1FAIpQLScLRbrn89CLK5I0YY8vajVXgkYfNBhJB_hNi1QW0bokt2bQtg/viewform",
    "deadline": "2024-05-15T23:59:59-07:00",
    "next_cycle_start": "",
    "embedding": []

    Description: ANNOUNCEMENT: The Billie Achilles Fund will not be accepting applications at this time. The application will reopen at the end of May, 2024. 

    The Billie Achilles Fund — offered by Bechtel International Center — provides funding for student organizations to develop creative programming that brings people of different international backgrounds together to increase cultural awareness and understanding. To qualify for funding, your program/event must include an intercultural component.

    The fund is named after Billie Achilles, a longtime friend to international students at Stanford.

    Who Can Apply
    To be eligible for funds, your organization must be a registered Stanford student organization with an international focus

    Additionally, your event must be free and open to the entire Stanford community.

    The fund does not support:

    Events primarily social in nature (e.g., parties or student group planning meetings)
    The purchase of alcohol
    Funding Limits
    Your organizations may apply for up to $1000 per event, not to exceed $2000 per group per academic year (while funds remain). Events not taking place at the Bechtel International Center cannot receive more than $500 per event.

    See Additional Requirements below for requirements regarding funding attribution in all event advertising and promotion.

    Funding Timeline
    Funds will be transferred within 4 weeks of the applications approval. Please keep this timeline in mind when applying for Achilles funding. 

    How to Apply
    To allow sufficient time for funding approvals and fund transfers to your organization, you should submit your funding application at least eight weeks prior to your event. We accept funding applications throughout the year (but do not review applications over Stanford’s Winter Closure).

    To make a funding request, complete and submit a Billie Achilles Fund Request.

    JSON:
    "title": "The Billie Achilles Fund",
    "description": "The Billie Achilles Fund — offered by Bechtel International Center — provides funding for student organizations to develop creative programming that brings people of different international backgrounds together to increase cultural awareness and understanding. To qualify for funding, your program/event must include an intercultural component. To be eligible for funds, your organization must be a registered Stanford student organization with an international focus. Additionally, your event must be free and open to the entire Stanford community. Your organizations may apply for up to $1000 per event, not to exceed $2000 per group per academic year (while funds remain). Events not taking place at the Bechtel International Center cannot receive more than $500 per event.",
    "eligibility": ["VSO"],
    "amount_min": 500,
    "amount_max": 1000,
    "url": "",
    "deadline": "",
    "next_cycle_start": "2024-05-31T00:00-08:00",
    "embedding": []

    Description: {text}

    JSON:
    """


    text = text.replace("\n", " ")
    completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
            ],
        model="gpt-4-turbo-preview", 
    )
    print(completion.choices[0].message.content)


if __name__ == '__main__':
    main()