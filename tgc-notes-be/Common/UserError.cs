using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tgc_notes_be.Common
{
    public class UserError
    {
        public UserError(string message, string code)
        {
            Message = message;
            Code = code;
        }
        public string Message { get; }
        public string Code { get; }
    }
}
