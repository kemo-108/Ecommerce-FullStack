using Microsoft.AspNetCore.Mvc;
using API.data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DepartmentsController(AppDbContext db)
        {
            _db = db;
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetDepartments()
        {
            var departs = _db.Departments.ToList();
            return Ok(departs);
        }

        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetDepartment(int id)
        {
            var depart = _db.Departments.Find(id);

            if (depart == null)
                return NotFound();

            return Ok(depart);
        }

        // CREATE
        [HttpPost]
        public IActionResult CreateDepartment(Department department)
        {
            if (department == null)
                return BadRequest();

            _db.Departments.Add(department);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetDepartment),
                new { id = department.DepartmentId },
                department);
        }

        // UPDATE
        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
                return BadRequest();

            var existing = _db.Departments.Find(id);

            if (existing == null)
                return NotFound();

            existing.DepartmentName = department.DepartmentName;

            _db.SaveChanges();

            return NoContent();
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            var depart = _db.Departments.Find(id);

            if (depart == null)
                return NotFound();

            _db.Departments.Remove(depart);
            _db.SaveChanges();

            return NoContent();
        }
    }
}