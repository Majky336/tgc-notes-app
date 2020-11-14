using System.Collections.Generic;
using tgc_notes_be.Common;
using tgc_notes_be.Database;

namespace tgc_notes_be.Workbooks
{
    public class WorkbookPayloadBase : Payload
    {
        protected WorkbookPayloadBase(Workbook workbook)
        {
            Workbook = workbook;
        }

        protected WorkbookPayloadBase(IReadOnlyList<UserError> errors) : base(errors)
        { }

        public Workbook Workbook { get; }
    }
}
