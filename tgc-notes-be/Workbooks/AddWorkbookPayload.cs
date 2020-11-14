using System.Collections.Generic;
using tgc_notes_be.Common;
using tgc_notes_be.Database;

namespace tgc_notes_be.Workbooks
{
    public class AddWorkbookPayload : WorkbookPayloadBase
    {
        public AddWorkbookPayload(Workbook workbook) : base(workbook) { }

        public AddWorkbookPayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}