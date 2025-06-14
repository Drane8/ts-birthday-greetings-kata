import { OurDate } from "src/core/ourDate/domain/OurDate";
import { LocalEmployeeRepository } from "../LocalEmployeeRepository";
import fs from "fs";

describe("LocalEmployeeRepository", () => {
  it("Should return list of employees whose birthday is ourDate", async () => {
    vi.spyOn(fs, "readFileSync")
      .mockReturnValue(`last_name, first_name, date_of_birth, email
                        Doe, John, 1982/10/08, john.doe@foobar.com
                        Ann, Mary, 1975/03/11, mary.ann@foobar.com
                        Anntonio, Mary, 1982/10/08, mary.ann@foobar.com
                        `);
    const ourDate = new OurDate("1982/10/08");

    const employees = await new LocalEmployeeRepository().listByBirthday(
      ourDate
    );

    expect(employees).toHaveLength(2);
  });
});
