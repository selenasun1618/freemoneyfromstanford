from openai import OpenAI
import datetime

def main():
    client = OpenAI()
    today_date = datetime.date.today()

    text = """
    Major Grant
Major grants support student-driven, full-time immersive projects supported by a faculty mentor, with priority given to Juniors.

Major Grants provide a 10-week stipend in support of full-time immersive Summer project commitments
Most Major Grants are awarded to students beginning an honors thesis, a senior project in the arts, or senior synthesis project between their junior and senior years.
Decisions are typically made within 6 weeks 
Funding is usually disbursed Week 1 of the quarter in which the project is executed 
Timeline
Application Deadline: Friday, March 1, 2024, 11:59pm PST 
Faculty Mentor Letter Deadline: Friday, March 8, 2024, 11:59pm PST
Project Execution: Summer 2024 
Stipend: $7500, with a need-based supplement (of up to $1500) for eligible students. For details on the stipend structure, visit our Constructing a Budget page.
Where to Start
Students interested in applying for a Major Grant should connect with their Faculty Mentor regarding their proposed project - Faculty Mentors should meet required eligibility criteria
Students should schedule a meeting with their Undergraduate Advising Director (UAD) as they write their proposal. UADs are well-versed with all VPUE Undergraduate Research grants
Application Guidelines
For the proposal:
Major Grant proposals should not exceed a word count of 2,500.
The proposal summary, reference list, and appendices do not count toward the word count.
Read through the Writing a Project Proposal site for specific guidelines on how to write a grant proposal. 
Additional materials (to be submitted along with the proposal):
Human Subjects Research - IRB protocol submission: If you are doing a project involving interviewing, observing, or otherwise working with human subjects, you must determine if your project requires Institutional Review Board (IRB) review.  You must upload proof that you submitted your IRB protocol in your grant application in order for your proposal to be considered. Federal law and Stanford University Policy require IRB approval before human subjects research can begin.
Click here to read more about the Human Subjects requirement.
Not sure if your project needs IRB review?  Contact Stanford’s IRB at irbnonmed@stanford.edu to consult with them. 
Animal Subjects Research - one-paragraph appendix: If your research involves animal subjects of any kind (vertebrate or invertebrate), you must include an Animal Subjects Research Appendix in your application. Federal law and Stanford University policy require APLAC/IACUC approval before animal subjects research can begin. Click here to read more about the Animal Subjects requirement.
Field contact letter: For students interviewing individuals and/or partnering with off-campus organizations for their projects (e.g. archives, hospitals, nonprofits, community organizations), you must submit in your grant application a brief letter of support from your field contact to demonstrate that you have established communication and are equipped to execute the project with their support.
Field Contact letters should be a brief note (screenshot of email correspondence is fine) that includes the following:
Date of correspondence
Indicates access to a research resource and clearly states what that resource is
Contact information of your primary contact
Students with multiple field contacts: Only one letter is required, but note that the Review Committee may request additional letters at the time of review
International Travel Safety Plan: A project or conference that involves international travel is required to have an International Travel Safety Plan. It must be included as an appendix in the grant proposal. For instructions on completing the travel plan, go to our International Travel webpage.
Read through the Go Apply site for more detailed information on the application materials you will need to assemble. Applicable links are as follows:
Requesting a Faculty Letter of Support
Writing a Project Proposal
Constructing a Budget
Major Grant Policies & Eligibility
**In addition to the below criteria specific to the Major Grant, all undergraduate students must meet our general eligibility requirements.** 

Priority given to Juniors
Frosh and Sophomores are encouraged to Explore Departmental Funding
Seniors who have not previously received a Major Grant are eligible but will have lower priority
Co-terms who have not conferred their undergraduate degree may apply if the project fits into their undergraduate academic trajectory, e.g., honors thesis, capstone project, etc. Students paying graduate tuition are ineligible.
Co-term students should read this Registrar webpage for details on when you are switched to graduate tuition.
Students may not be on a Leave of Absence (LOA) while using grant funding. Students who have been on LOA for 3 consecutive quarters prior to the funding period are not eligible (e.g., Autumn, Winter, and Spring).
Time commitment: The Major Grant project is a full-time opportunity. Full-time engagement is defined as 35+ hours per week over the 10-week summer quarter. Students and faculty mentors should confer and agree upon any significant time commitments outside of this defined project engagement.
Students may not receive both academic units and a stipend for any single project activity.
Major Grant recipients are not permitted to engage in another full-time internship, job, or volunteer opportunity (whether funded by Stanford or otherwise), unless their faculty mentors or program coordinators have approved these arrangements.
As a reminder, VPUE grant recipients who are planning on concurrently participating in another Stanford program should also abide by the funding and program policies of the sponsoring unit.
    """


    system_prompt = f"""
    Using the entered information, populate this json element:
        "title": string,
        "description": string,
        "eligibility": Subset of ["Undergraduate", "MastersStudent", "Coterm", "PhD", "Postdoc", "Faculty", "VSO", "Other"],
        "amountMin": Int,
        "amountMax": Int,
        "url": string,
        "deadline": string,
        "nextCycleStartDate": string,
    "description" should be copy-pasted sentences from the original description.
    "VSO" in the "eligibility" field is a student group. Any offerings for a student group should include "VSO" as eligible.
    "Coterm" is a 5 year master's program. All coterm students are Master's students and can qualify for Graduate funding.
    "deadline" and "nextCycleStartDate" should be in ISO 8601 format, and assume 11:59PM PT if the deadline time is not listed.
    "deadline" should be an empty string if the deadline has passed for this cycle. The deadline has passed if it's before our current date, {today_date}.
    If today's date is {today_date}, and the deadline was Dec 2023, "deadline" = "" (empty string).
    "nextCycleStartDate" is the anticipated next start date, and if only a deadline is given, the anticipated application open date should be 2 months before then. For example, "The application period closed on March 20, 2024" should translate to "nextCycleStartDate": "2023-01-20T00:00-08:00"
    If applications is due annually January, and today's date is April 5, 2024, "nextCycleStartDate" = "2025-01-01T00:00-08:00"
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
    "amountMin": 7500,
    "amountMax": 7500,
    "url": "https://docs.google.com/forms/d/e/1FAIpQLScLRbrn89CLK5I0YY8vajVXgkYfNBhJB_hNi1QW0bokt2bQtg/viewform",
    "deadline": "2024-05-15T23:59:59-07:00",
    "nextCycleStartDate": "",

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
    "amountMin": 500,
    "amountMax": 1000,
    "url": "",
    "deadline": "",
    "nextCycleStart": "2024-05-31T00:00-08:00",

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